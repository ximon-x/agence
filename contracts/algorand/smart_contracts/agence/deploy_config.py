import logging
import json

import algokit_utils
from algosdk.v2client.algod import AlgodClient
from algosdk.v2client.indexer import IndexerClient

logger = logging.getLogger(__name__)


def deploy(
    algod_client: AlgodClient,
    indexer_client: IndexerClient,
    deployer: algokit_utils.Account,
) -> None:
    from smart_contracts.artifacts.agence_governance.agence_governance_client import (
        AgenceGovernanceClient,
    )

    governance_client = AgenceGovernanceClient(
        algod_client,
        creator=deployer,
        indexer_client=indexer_client,
    )

    governance_client.deploy(
        on_schema_break=algokit_utils.OnSchemaBreak.AppendApp,
        on_update=algokit_utils.OnUpdate.AppendApp,
    )

    from smart_contracts.artifacts.agence_staking.agence_staking_client import (
        AgenceStakingClient,
        DeployCreate as StakingDeployCreate,
        InitArgs as StakingInitArgs,
    )

    staking_client = AgenceStakingClient(
        algod_client,
        creator=deployer,
        indexer_client=indexer_client,
    )

    staking_client.deploy(
        on_schema_break=algokit_utils.OnSchemaBreak.AppendApp,
        on_update=algokit_utils.OnUpdate.AppendApp,
        create_args=StakingDeployCreate(
            args=StakingInitArgs(
                governance_account=governance_client.app_address,
                governance_app_id=governance_client.app_id,
            )
        ),
    )

    from smart_contracts.artifacts.agence_gigs.agence_gigs_client import (
        AgenceGigsClient,
        DeployCreate as GigsDeployCreate,
        InitArgs as GigsInitArgs,
    )

    gigs_client = AgenceGigsClient(
        algod_client,
        creator=deployer,
        indexer_client=indexer_client,
    )

    gigs_client.deploy(
        on_schema_break=algokit_utils.OnSchemaBreak.AppendApp,
        on_update=algokit_utils.OnUpdate.AppendApp,
        create_args=GigsDeployCreate(
            args=GigsInitArgs(
                governance_account=governance_client.app_address,
                governance_app_id=governance_client.app_id,
            )
        ),
    )
    from smart_contracts.artifacts.agence.agence_client import (
        AgenceClient,
        DeployCreate as AppDeployCreate,
        InitArgs as AppInitArgs,
    )

    governance_client.init(
        staking_account=staking_client.app_address,
        staking_app_id=staking_client.app_id,
        gigs_account=gigs_client.app_address,
        gigs_app_id=gigs_client.app_id,
    )

    app_client = AgenceClient(
        algod_client,
        creator=deployer,
        indexer_client=indexer_client,
    )

    app_client.deploy(
        on_schema_break=algokit_utils.OnSchemaBreak.AppendApp,
        on_update=algokit_utils.OnUpdate.AppendApp,
        create_args=AppDeployCreate(
            args=AppInitArgs(
                governance_account=governance_client.app_address,
                governance_app_id=governance_client.app_id,
                staking_account=staking_client.app_address,
                staking_app_id=staking_client.app_id,
                gigs_account=gigs_client.app_address,
                gigs_app_id=gigs_client.app_id,
            )
        ),
    )

    data = {
        "governance": {
            "address": governance_client.app_address,
            "id": governance_client.app_id,
        },
        "staking": {
            "address": staking_client.app_address,
            "id": staking_client.app_id,
        },
        "gigs": {
            "address": gigs_client.app_address,
            "id": gigs_client.app_id,
        },
        "app": {
            "address": app_client.app_address,
            "id": app_client.app_id,
        },
    }

    with open(
        "smart_contracts/artifacts/agence_contracts.json", "w", encoding="utf-8"
    ) as f:
        json.dump(data, f, ensure_ascii=False, indent=4)

    logger.info(
        f"Deployed Agence app at {app_client.app_address} with id {app_client.app_id}"
    )

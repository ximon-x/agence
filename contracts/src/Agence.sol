// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {OApp, Origin, MessagingFee} from "@layerzerolabs/oapp-evm/contracts/oapp/OApp.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

// Agence Contracts Imports
import {AgenceGovernor} from "./AgenceGovernor.sol";
import {AgenceTreasury} from "./AgenceTreasury.sol";
import {AgenceGigs} from "./AgenceGigs.sol";

// Token Contracts Imports
import {AgenceToken} from "./AgenceToken.sol";
import {sUSDe} from "./mocks/sUSDe.sol";
import {USDe} from "./mocks/USDe.sol";

contract Agence is OApp {
    AgenceGovernor public immutable governor;
    AgenceTreasury public immutable treasury;
    AgenceGigs public immutable gigs;

    AgenceToken public immutable votingToken;
    sUSDe public immutable rewardsToken;
    USDe public immutable stakingToken;

    uint256 constant INITIAL_SUPPLY = 1000000 ether;
    string public data;

    /**
     * @notice Agence constructor.
     * @param _endpoint OApp Endpoint contract address.
     * @param _owner Owner of the Agence contract.
     */
    constructor(
        address _endpoint,
        address _owner
    ) OApp(_endpoint, _owner) Ownable(_owner) {
        votingToken = new AgenceToken(INITIAL_SUPPLY, address(this));

        stakingToken = new USDe(
            "Mock USDe",
            "USDe",
            INITIAL_SUPPLY,
            _endpoint,
            address(this)
        );

        rewardsToken = new sUSDe(
            "Mock sUSDe",
            "sUSDe",
            INITIAL_SUPPLY,
            _endpoint,
            address(this)
        );

        // TODO: Uncomment this line once the AgenceGovernor contract is ready
        // governor = new AgenceGovernor(msg.sender);

        treasury = new AgenceTreasury(
            msg.sender,
            address(rewardsToken),
            address(stakingToken)
        );

        gigs = new AgenceGigs(msg.sender);
    }

    /**
     * @notice Sends a message from the source to destination chain.
     * @param _dstEid Destination chain's endpoint ID.
     * @param _message The message to send.
     * @param _options Message execution options (e.g., for sending gas to destination).
     */
    function send(
        uint32 _dstEid,
        string memory _message,
        bytes calldata _options
    ) external payable {
        bytes memory _payload = abi.encode(_message);

        _lzSend(
            _dstEid,
            _payload,
            _options,
            MessagingFee(msg.value, 0),
            payable(msg.sender)
        );
    }

    /// @notice Estimates the gas associated with sending a message.
    /// @param _dstEid The endpoint ID of the destination chain.
    /// @param _message The message to be sent.
    /// @param _options The message execution options (e.g. gas to use on destination).
    /// @return nativeFee Estimated gas fee in native gas.
    /// @return lzTokenFee Estimated gas fee in ZRO token.
    function estimateFee(
        uint32 _dstEid,
        string memory _message,
        bytes calldata _options
    ) public view returns (uint256 nativeFee, uint256 lzTokenFee) {
        bytes memory _payload = abi.encode(_message);
        MessagingFee memory fee = _quote(_dstEid, _payload, _options, false);
        return (fee.nativeFee, fee.lzTokenFee);
    }

    /**
     * @dev Called when data is received from the protocol. It overrides the equivalent function in the parent contract.
     * Protocol messages are defined as packets, comprised of the following parameters.
     * @param _origin A struct containing information about where the packet came from.
     * @param _guid A global unique identifier for tracking the packet.
     * @param payload Encoded message.
     */
    function _lzReceive(
        Origin calldata _origin,
        bytes32 _guid,
        bytes calldata payload,
        address,
        bytes calldata
    ) internal override {
        data = abi.decode(payload, (string));
    }
}

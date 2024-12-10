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

enum Role {
    Ace,
    Agency
}

struct User {
    Role role;
    uint8 rating;
    bool isValid;
    uint16 pendingGigs;
    uint16 completedGigs;
    uint16 canceledGigs;
    uint16 flaggedGigs;
    uint16 totalGigs;
}

event UserCreated(address userAddress, Role role);
event DataReceived(bytes32 _guid, string data, bytes32 sender, uint32 srcEid);

error UserAlreadyCreated();
error NotEnoughFunds();

contract Agence is OApp {
    AgenceGovernor public immutable governorContract;
    AgenceTreasury public immutable treasuryContract;
    AgenceGigs public immutable gigsContract;

    AgenceToken public immutable votingToken;
    sUSDe public immutable rewardsToken;
    USDe public immutable stakingToken;

    uint256 constant INITIAL_SUPPLY = 1000000 ether;
    uint256 constant MIN_REGISTRATION_FEE = 0.001 ether;

    mapping(address => User) public users;

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
        // Deploy mock staking token and set the Agence contract as the staking 
        // token's delegate.
        stakingToken = new USDe(
            "Mock USDe",
            "USDe",
            _endpoint,
            address(this)
        );

        // Deploy mock rewards token and set the Agence contract as the rewards 
        // token's delegate
        rewardsToken = new sUSDe(
            "Mock sUSDe",
            "sUSDe",
            _endpoint,
            address(this)
        );

        // Deploy the Agence voting token and set the Agence contract as the
        // voting token's delegate
        votingToken = new AgenceToken(
            "Agence",
            "AGE",
            address(this)
        );

        // TODO: Uncomment this line once the AgenceGovernor contract is ready
        // governorContract = new AgenceGovernor(address(this));

        // Deploy the AgenceTreasury contract
        treasuryContract = new AgenceTreasury(this,
            stakingToken,
            rewardsToken,
            votingToken
        );

        // Deploy the AgenceGigs contract
        gigsContract = new AgenceGigs(this);

        stakingToken.mint(address(this), INITIAL_SUPPLY);
        votingToken.mint(address(treasuryContract), INITIAL_SUPPLY);
        rewardsToken.mint(address(treasuryContract), INITIAL_SUPPLY);
    }

    /**
     * @notice Registers a user with the Agence contract.
     * @notice The registration fee is 0.001 ETH.
     * @notice Sends 10 USDe tokens to the user.
     * @dev Reverts if the registration fee is not fully paid.
     * @dev Reverts if the user has already been registered.
     * @param role The role of the user to register (Ace or Agency).
     */
    function register(Role role) external payable {
        // Sanity checks
        require (msg.value > MIN_REGISTRATION_FEE,  NotEnoughFunds());
        require(!users[msg.sender].isValid, UserAlreadyCreated());

        // Create the user 
        User memory user = User({
            role: role,
            rating: 0,
            isValid: true,
            pendingGigs: 0,
            completedGigs: 0,
            canceledGigs: 0,
            flaggedGigs: 0,
            totalGigs: 0
        });

        // Transfer 10 USDe tokens to the user.
        stakingToken.transfer(msg.sender, 10 ether);
        users[msg.sender] = user;

        emit UserCreated(msg.sender, role);
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

    /**
    * @notice Estimates the gas associated with sending a message.
    * @param _dstEid The endpoint ID of the destination chain.
    * @param _message The message to be sent.
    * @param _options The message execution options (e.g. gas to use on destination).
    * @return nativeFee Estimated gas fee in native gas.
    * @return lzTokenFee Estimated gas fee in ZRO token.
    */
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
     * @notice Retrieves user information for a given address.
     * @param userAddress The address of the user to retrieve.
     * @return The User struct containing user details.
     */
    function getUser(address userAddress) public view returns (User memory) {
        return users[userAddress];
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

        emit DataReceived( _guid, data, _origin.sender, _origin.srcEid );
    }
}

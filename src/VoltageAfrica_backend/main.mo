actor {
  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };
};
actor EnergyTrading {

// Energy Token structure
type EnergyToken = {
id: Nat;
owner: Principal;
energyAmount: Nat;
price: Nat;
};

/ Store energy tokens
stable var tokens: [EnergyToken] = [];

// Map user balances
stable var balances: [(Principal, Nat)] = [];

// Create a new energy token
public func createToken(amount: Nat, price: Nat) : async Text {
let tokenId = Nat(tokens.size());
let newToken = Energy {
id = tokenId;
owner = Principal.fromText("your-principal-id");
energyAmount = amount;
price = price;
};
tokens := Array.append(tokens, [newToken]);
return "Token created"
}

// Transfer energy token
public func transferToken(tokenId: Nat, buyer: Principal) : async Text {
let token = Array.find(tokens, func(t) { t.id == tokenId });
switch (token) {
case (?t) {
if (t.owner == Principal.fromText("your-principal-id")) {
let updateToken = EnergyToken {
id = t.id;
owner = buyer;
energyAmount = t.energyAmount;
price = t.price;
};
tokens[toneId] := updatedToken;
return "Transfer successful";
} else {
return "unauthorized transfer";
}
};
case null { return "Token not found"; }
}
}
#Getting AVailable Token List...

public query func getAvailableTokens() ; async [EnergyToken] {
return tokens;
}
}


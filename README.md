
##### Start new network

```
geth init genesis.json
```


##### Run the network without mining

```
geth --rpc --fast --cache 512 --ipcpath ~/Library/Ethereum/geth.ipc --networkid 15
```

##### Run the network with mining 

```
geth --rpc --cache 512 --ipcpath ~/Library/Ethereum/geth.ipc --networkid 15 --mine --minerthreads=1 --etherbase=0x0000000000000000000000000000000000000000
```

##### Compile the contract
```
solc --bin --abi -o bin --overwrite greeter.sol
```
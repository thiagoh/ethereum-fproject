
##### Start new network

```
geth init genesis.json
```


##### Run the network without mining

```
geth --fast --cache 512 --ipcpath ~/Library/Ethereum/geth.ipc --networkid 15
```

##### Run the network with mining 

```
geth --cache 512 --ipcpath ~/Library/Ethereum/geth.ipc --networkid 15 --mine --minerthreads=1 --etherbase=0x0000000000000000000000000000000000000000
```
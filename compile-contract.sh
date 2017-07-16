#!/bin/bash

solc --gas --bin --abi -o bin --overwrite conference.sol

rm -f last-deployed-contract
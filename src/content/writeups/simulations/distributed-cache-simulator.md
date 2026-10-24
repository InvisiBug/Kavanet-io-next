# Distributed Cache Simulator

![Distributed Cache Simulator placeholder image](/placeholders/distributed-cache-simulator.svg)

## Objective
Model cache behavior across multiple nodes and understand how key distribution, replication factor, and request skew affect hit rates.

## Simulation Model
- Configurable node count and replication strategy
- Zipf-like key request distributions
- Failure injection for node drops

## Insights
Replication improves resilience but can reduce effective capacity. Balanced sharding with measured replication gave the best reliability-to-cost ratio.

# Lisajous Table


## Objective
Experiment with storing data over the lifecycle of a system

## Constraints
- Regional latency budgets
- Capacity ceilings per cluster
- Graceful degradation under outages

## Approach
The model applies weighted routing based on dynamic health signals and back-pressure indicators.

## Findings
Latency variance dropped when routing was adjusted with rolling windows instead of immediate spikes.

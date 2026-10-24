# Grid Load Balancer Model

![Grid Load Balancer Model placeholder image](/placeholders/grid-load-balancer-model.svg)

## Objective
Explore request routing across regional clusters while optimizing for latency and failure tolerance.

## Constraints
- Regional latency budgets
- Capacity ceilings per cluster
- Graceful degradation under outages

## Approach
The model applies weighted routing based on dynamic health signals and back-pressure indicators.

## Findings
Latency variance dropped when routing was adjusted with rolling windows instead of immediate spikes.

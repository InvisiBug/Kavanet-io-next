# Generative Art Lab

![Generative Art Lab placeholder image](/placeholders/generative-art-lab.svg)

## Overview
Generative Art Lab is a browser sketchbook for procedural visuals. It focuses on building composable systems where small rules produce rich visual outputs.

## Goals
- Keep rendering pipelines simple and modular
- Build reusable shape, motion, and color primitives
- Publish loops as exportable scenes

## Technical Notes
- Rendering via HTML Canvas
- Preset engine based on serializable configuration
- Lightweight controls for parameter tweaks

## What I Learned
The best improvements came from reducing complexity in the update loop and keeping scene state immutable where possible.

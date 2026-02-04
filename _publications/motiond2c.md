---
title: "Fast and Accurate Text-to-Motion Generation through Discrete-Guided Continuous Modeling"
collection: publications
category: conferences
permalink: #/publication/2024-02-17-paper-title-number-4
excerpt: 'Text-to-MotionGeneration, Multi-modal Learning, Autoregressive Models, Flow Models, Generative Models'
date: 2026-01-18
venue: 'ICASSP 2026'
paperurl: #'https://academicpages.github.io/files/paper3.pdf'
citation: #'Your Name, You. (2025). &quot;Fast and Accurate Text-to-Motion Generation through Discrete-Guided Continuous Modeling.&quot; <i>ICASSP 2026</i>. 1(3).'b
---

## Abstract

Generating human motion from text is highly challenging, as motion data lies in a high-dimensional continuous space with complex distributions. Existing VQ-based methods address this by quantizing motion data into discrete tokens for autoregressive modeling, but suffer from quantization loss. In contrast, continuous representation methods encode motion data as continuous tokens and model them directly using autoregressive models combined with diffusion heads. However, the complexity of continuous distributions often leads to distributional artifacts, while repeated diffusion heads increase inference cost. To overcome these issues, we propose Motiond2c, a novel framework bridging discrete and continuous representations. We introduce discrete tokens as an intermediate representation and use them to guide a Rectified Flow model in generating fine-grained continuous tokens. This design facilitates continuous token modeling and avoids the repeated use of diffusion heads. In addition, we propose a dual-branch VQ-VAE with a two-stage training strategy, supporting both discrete encoding and continuous decoding of motion. Experiments on HumanML3D and KIT-ML demonstrate that Motiond2c achieves state-of-the-art performance with excellent inference efficiency, attaining a Top-1 score of 0.521, an FID of 0.063, and an average inference time (AIT) of 0.16s on HumanML3D.

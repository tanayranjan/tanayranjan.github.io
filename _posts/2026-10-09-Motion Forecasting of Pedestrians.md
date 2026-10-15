---
# multilingual page pair id, this must pair with translations of this page. (This name must be unique)
lng_pair: id_forecasting
title: "Motion Forecasting of Pedestrians"

# post specific
# if not specified, .name will be used from _data/owner/[language].yml
author: Tanay Ranjan
# multiple category is not supported
category: Projects
# multiple tag entries are possible
tags: [Python, Autonomous Driving, Motion Forecasting, Trajectory Prediction, Deep Learning, PyTorch, LSTM, Argoverse 2, Pedestrian Dynamics]
# thumbnail image for post
img: ":ACDC/hero_thumbnail.png"
# disable comments on this page
#comments_disable: true

# publish date
date: 2026-10-09 08:00:00 +0900

# seo
# if not specified, date will be used.
#meta_modify_date: 2022-01-01 10:04:30 +0900
# check the meta_common_description in _data/owner/[language].yml
#meta_description: ""

# optional
# please use the "image_viewer_on" below to enable image viewer for individual pages or posts (_posts/ or [language]/_posts folders).
# image viewer can be enabled or disabled for all posts using the "image_viewer_posts: true" setting in _data/conf/main.yml.
#image_viewer_on: true
# please use the "image_lazy_loader_on" below to enable image lazy loader for individual pages or posts (_posts/ or [language]/_posts folders).
# image lazy loader can be enabled or disabled for all posts using the "image_lazy_loader_posts: true" setting in _data/conf/main.yml.
#image_lazy_loader_on: true
# exclude from on site search
#on_site_search_exclude: true
# exclude from search engines
#search_engine_exclude: true
# to disable this page, simply set published: false or delete this file
#published: false
---

# Motion Forecasting for Autonomous Driving

Anticipating the future movements of dynamic traffic agents is a critical link between environment perception and safe path planning in autonomous driving. This research project, developed as part of the Automated and Connected Driving Challenges initiative (09/2026), focuses on trajectory prediction using the large-scale Argoverse 2 (AV2) Motion Forecasting dataset.

Our team tackled this complex problem by building a suite of models, transitioning from basic physics-based kinematic baselines to advanced interaction-aware and map-aware deep learning architectures.

# My Contribution: Pedestrian Motion Forecasting

![ACDC_Architecture.drawio.svg](:ACDC/ACDC_Architecture.drawio.svg)

Traffic participants operate under fundamentally different dynamics; unlike vehicles that follow structured lane geometry, pedestrians exhibit short-range, highly irregular movements and require a tighter, localized spatial context. To address this, I spearheaded the design and development of a pedestrian-specific Map-Aware Social-LSTM model.

- **Architectural Design**: The model utilizes a dual-branch design that explicitly decomposes social and scene information into dedicated encoders.
- **Context Integration**: It combines grid-based social pooling—aggregating the hidden states of neighboring agents to capture human-human interactions—with hand-crafted map features over a 2-second history and forecasting horizon.
- **Performance Metrics**: Evaluated against 19,603 pedestrian validation scenes, the model achieved highly accurate forecasts, logging an Average Displacement Error (ADE) of 0.2187 m and a Final Displacement Error (FDE) of 0.5107 m.
- **Reliability**: The model successfully secured a 23.67% miss rate at a strict 0.8 m threshold.

## Technical Stack & Compute Environment

- **Frameworks & Libraries**: Built primarily in PyTorch (v2.8.0), leveraging the Argoverse 2 API (av2), pandas, pyarrow, and NumPy for data manipulation.
- **Hardware**: Developed, trained, and validated on an institute GPU server equipped with an NVIDIA A40 (47.7 GB VRAM) running CUDA 12.8.
- **Data Pipeline**: Engineered multi-worker DataLoaders and parallel map preprocessing scripts to convert 11-second multi-agent raw scenarios into focal-centric spatial matrices for high-speed GPU transfer.

## Results

While the architecture successfully fused social and map context, evaluating its true real-world viability revealed both strong predictive capabilities in structured environments and critical limitations in complex edge cases.

### Successful Trajectory Forecasting

In scenarios with clear spatial constraints and observable intent, the model accurately captured distinct pedestrian maneuvers:

<figure><img src="/assets/img/posts/ACDC/goodprediction_1.png" alt="Plot 1"><figcaption>Accurate prediction of a pedestrian turn.</figcaption></figure>

<figure><img src="/assets/img/posts/ACDC/goodprediction_2.png" alt="Plot 2"><figcaption>Accurate extrapolation of a linear pedestrian path.</figcaption></figure>

<figure><img src="/assets/img/posts/ACDC/goodprediction_4.png" alt="Plot 3"><figcaption>Anticipation of a pedestrian navigating toward a crosswalk.</figcaption></figure>

### Architectural and Data-Driven Limitations

Despite these successes, edge-case analysis exposed scenarios where the prediction collapsed, driven primarily by either architectural rigidity or underlying data quality issues.

1. Architectural Constraints: The Purple Pedestrian Failure

In the complex interaction shown below, the model fails to predict the true path of the purple pedestrian.

<figure><img src="/assets/img/posts/ACDC/failureprediction_1.png" alt="Plot 4"><figcaption>Failure in prediction of purple pedestrian</figcaption></figure>

This failure highlights two specific architectural flaws: 
- **Overly Rigid Social Repulsion**: The grid-based social pooling forces the purple pedestrian to maintain a parallel path, effectively preventing it from cutting across the adjacent blue pedestrian to avoid a perceived, mathematically heavily-penalized collision.
- **Map Context Dilution**: Using mean pooling for the map context geographically blurs the distinct boundary of the crosswalk. Consequently, the attractive signal of the crosswalk becomes too weak to override the aggressive social repulsion. Implementing a weighted average or max pooling mechanism could have preserved this critical map feature better.

2. Data Limitations: Missing History

A significant portion of prediction errors stemmed directly from imperfect sensor recordings.

<figure><img src="/assets/img/posts/ACDC/failureprediction_2.png" alt="Plot 5"><figcaption>Failure in prediction due to missing of data</figcaption></figure>

During preprocessing, tracks with missing frames were padded with the latest available positional data to maintain tensor dimensions. If a pedestrian's history was entirely truncated before the prediction threshold, the padding forced the model to perceive the agent as stationary. Consequently, the model predicts a stationary future, completely failing to capture the sudden, unrecorded onset of movement.


3. Sensor Noise and the ADE/FDE Metric Fallacy

Finally, irregular trajectories, whether caused by erratic human movement or sensor tracking noise-frequently caused the prediction to collapse, as there were no discernible kinematic patterns for the LSTM to latch onto.

<figure><img src="/assets/img/posts/ACDC/randomprediction_1.png" alt="Plot 6"><figcaption>Failure in prediction due to randomness of the trajectory</figcaption></figure>

Crucially, the example above exposes a fundamental flaw in how motion forecasting is evaluated. Despite the prediction collapsing visually and behaviorally, the Average Displacement Error (ADE) and Final Displacement Error (FDE) values for this plot remain misleadingly low. Because human motion operates within a much smaller spatial radius than vehicle motion, absolute error values in meters inherently stay small. This confirms that while ADE and FDE are standard benchmarks, they are heavily flawed metrics for evaluating the true behavioral accuracy and safety viability of pedestrian trajectory predictions.


## The Broader Team Effort

While I led the pedestrian architecture, this project was a highly collaborative effort alongside my teammates, Ishita Jain and Manish Rajasekar. They focused on the agent-agnostic models designed for vehicles and other dynamic agents.

Their work progressed from Constant Velocity (CV) and Constant Acceleration (CA) baselines to a socially-aware LSTM utilizing multi-head cross-attention. The team's final multimodal architecture combined this cross-attention social pooling with a 1D-CNN encoder processing the nearest 16 map lane centerlines to output six diverse future trajectories per agent. Together, our combined research supported the hypothesis that integrating explicit map context resolves significant ambiguity in agent intent.

## Future Work & Links

Future iterations of this research will extend the analysis beyond LSTM backbones to explore state-of-the-art transformer-based vectorized models, such as HiVT and QCNet, which currently define the benchmark standards on the Argoverse dataset.

## ![GitHub Link](https://github.com/tanayranjan/acdc-motion-forecasting-rwth-aachen)
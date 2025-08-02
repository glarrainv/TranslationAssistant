# 北京市协作者未社会工作发张中心**翻译工具**
# [Facilitator](http://www.facilitator.org.cn/facilitators/our-history/) **Chinese-English Translation Tool**

## About

This tool was developed for the Beijing Facilitator Social Work Development Center by Gaspar Larrain as part of the University of Notre Dame Global Professional Experience.
It was evaluated and supervised by Pan Yu who has full authorship over this project.

It contains both an online version using Open Router API's free Qwen3:14B model
and a locally run version with Qwen3:4B

Both use the same system prompt and parameters to serve as a translator, corrector and assistant from Chinese to English.

The main benefit about this project is the heavy focus on the user's understanding. Instead of blindly relying on the translator this tool breaks down sentence by sentence the process of translation trying to uncover the nuances learners and Machine Translation tools often overlook.

### Features

Clean and easy to use local user interface.
Local wordfile for consistent translation regarding company branding.
Automatic download of responses.
Easy setup and running through .bat files provided

### Online Version RECOMMENDED

Pros:

- Extremely fast response time with higher accuracy in its responses.
- Doesn't require heavy processing power, so works in most devices.
- Easy error catching in user interface

Cons

- Requires internet connection
- 50 uses per day on all devices combined
- Breaks when coppying down 2+ pages of text

### Offline

Pros:

- Works Offline
- Can process very long texts with minor differences in time usage
- Unlimited uses per device

Cons

- Extremely slow
- Requires very heavy processing power which may slow down computer and use cooling system

## Quickstart 打开

1. Download and Extract 翻译工作
2. Open set up tools for desired option 网络设置.bat and/or 离线设置 （可选的）.bat
3. Use the respective 打开 file of the intended program
4. Input prompt in the opened browser application or access it through http://localhost:5500/wangluo.html or http://localhost:5500/lixiang.html

5. (IF NEEDED) use 停 for emergency closing
6. (IF USEFUL) add direct translations to 汉字.txt to automatically include them in your prompts

## MIT Licence

# Worst AI Advice: The 48-Hour Tight Line Open

[![make.fun](https://make.fun/badge/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580.svg)](https://make.fun/competitions/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580)
[![rank](https://make.fun/badge/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580/dankurniaone/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580/rank.svg)](https://make.fun/competitions/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580)
[![reward](https://make.fun/badge/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580/dankurniaone/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580/reward.svg)](https://make.fun/competitions/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580)

Entry for the [Worst AI Advice: The 48-Hour Tight Line Open](https://make.fun/competitions/u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580) bounty on [make.fun](https://make.fun): one line of the worst advice an AI could give, 140 characters or fewer.

## The line

> If your code has a bug, delete the tests. A bug that isn't tested doesn't exist.

(80 characters.)

## How it works

`main.ts` (Node 22, standard library only) writes the line to `/output/entry.txt`, validating the gate first: 1–140 characters, not only white space, a single line — then reads the file back to verify the round trip.

```sh
node main.ts
```

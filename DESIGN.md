# Design Direction

Personal portfolio and intellectual notebook of Bayu Adji Ramadhan, bringing together formal work (research, software, business systems) and informal notes (essays and field observations) under one voice.

`Dial: ENERGY 2 / RHYTHM 2 / MOTION 1`

## Design Read

Reading this as a hybrid professional portfolio and personal notebook for curious readers, researchers, and collaborators, in a quiet monochrome editorial print style, dial ENERGY 2 / RHYTHM 2 / MOTION 1.

## Identity & Voice

- **Identity:** A Cultural Anthropology student with a Software Engineering background exploring how people interact with technology, businesses, and social systems.
- **Voice:** Plain, curious, grounded, and direct. Avoid corporate hype, inflated seniority, resume buzzwords, unverified metrics, and decorative clutter.

## Palette (WCAG AA Verified)

- `--paper: #FAFAF9` (warm paper canvas)
- `--surface: #FFFFFF` (elevated surface for featured work and cards)
- `--panel: #F0EFEA` (soft paper tint for inputs and quiet containers)
- `--ink: #0A0A0A` (primary ink and focal action fill; 18.96:1 on `--paper`)
- `--ink-soft: #262624` (hover/active solid button fill)
- `--mid: #52524E` (secondary body copy; >= 6.8:1 on `--paper` and `--panel`)
- `--subtle: #5C5C58` (quiet metadata; >= 6.3:1 on `--paper` and `--surface`)
- `--border-ui: #73726C` (interactive control borders; >= 4.5:1 on `--paper`, satisfies WCAG 1.4.11 non-text contrast)
- `--line: #D4D2CE` (non-interactive hairline section dividers only)

## Typography

- **Display headings:** `Newsreader` italic (weight 400) for calm editorial voice.
- **Body and UI controls:** `Inter` (weights 400 to 700) for high legibility across prose, lists, and forms.
- **Monospace:** System monospace strictly for metadata years and copyable demo credentials.

## Identity Motif & Motion

- **Motif:** Italic `Newsreader` display headings over warm `#FAFAF9` paper and clean horizontal hairline dividers.
- **Motion (MOTION 1):** Hover, active, and focus transitions only. No endless pulses, no template entrance animations.

## Decision Log

| Concern | Choice | Reason |
|---------|--------|--------|
| Color | Warm paper `#FAFAF9` + `#0A0A0A` ink + neutral greys | Reads like printed field notes and keeps contrast high without decorative color noise. |
| Accent | Solid `#0A0A0A` ink reserved for primary buttons and active filters | Single deliberate focal signal separates primary actions from quiet reading content. |
| Typography | `Newsreader` italic + `Inter` + monospace for years/credentials | Serif titles carry human narrative voice while sans-serif keeps longform reading and UI crisp. |
| Layout | Two-column editorial list on Home/About/Contact; featured block + grid on Work | Reflects actual content weight instead of repeating one card-grid template on every page. |
| Spacing | Generous vertical breathing room on desktop, tighter scale at `<= 900px` and `<= 720px` | Uses whitespace to pace reading sections while preventing awkward stretching or crowding across breakpoints. |
| Cards | Featured block for Fieldnotes; compact type/year headers when projects lack cover images | Avoids blank placeholder boxes and copy-paste cards by matching layout to real project assets. |
| Motion | Hover/active state transitions only; `prefers-reduced-motion` honored; no autoplaying videos | Matches `MOTION 1` so interactive controls confirm clicks without distracting or disorienting readers. |

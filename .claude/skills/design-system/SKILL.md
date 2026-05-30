---
name: design-system-co-star-hyper
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Co – Star: Hyper

## Mission
Deliver implementation-ready design-system guidance for Co – Star: Hyper that can be applied consistently across web app interfaces.

## Brand
- Product/brand: Co – Star: Hyper
- URL: https://www.costarastrology.com/
- Audience: readers and knowledge seekers
- Product surface: web app

## Style Foundations
- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=Times New Roman`, `font.family.stack=Times New Roman`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=16px`
- Typography scale: `font.size.xs=0px`, `font.size.sm=11px`, `font.size.md=12px`, `font.size.lg=14px`, `font.size.xl=16px`, `font.size.2xl=23px`, `font.size.3xl=40px`
- Color palette: `color.text.primary=#575657`, `color.text.secondary=#333333`, `color.surface.base=#000000`, `color.text.inverse=#ffffff`, `color.surface.muted=#141414`, `color.surface.raised=#f7f7f7`, `color.surface.strong=#fbfbfb`
- Spacing scale: `space.1=4px`, `space.2=10px`, `space.3=14px`, `space.4=15px`, `space.5=16px`, `space.6=20px`, `space.7=35px`, `space.8=40px`
- Radius/shadow/motion tokens: manual token definitions required

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->

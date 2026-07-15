    btn.addEventListener('click', () => answerShade(name, btn));
    shadeOptions.appendChild(btn);
  });
}

function answerShade(chosen, btnEl) {
  if (shadeAnswered) return;
  shadeAnswered = true;
  const c = SHADE_COLORS[shadeIndex];
  const isCorrect = chosen === c.name;
  if (isCorrect) shadeScore++;

  [...shadeOptions.children].forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === c.name) btn.classList.add('correct');
    else if (btn === btnEl) btn.classList.add('wrong');
  });

  shadeFeedback.textContent = isCorrect
    ? "Yes — that's " + c.name + "."
    : "Nope — that's " + c.name + ".";
  shadeScoreLabel.textContent = "Score: " + shadeScore;

  setTimeout(() => {
    shadeIndex++;
    if (shadeIndex >= SHADE_COLORS.length) {
      finishShade();
    } else {
      loadShadeQuestion();
    }
  }, 1100);
}

function finishShade() {
  shadeProgressFill.style.width = "100%";
  shadeCard.hidden = true;
  shadeResults.hidden = false;
  shadeFinalScore.textContent = shadeScore + " / " + SHADE_COLORS.length;

  const pct = shadeScore / SHADE_COLORS.length;
  let msg;
  if (pct >= 0.9) msg = "Certified color expert. The late-round traps didn't fool you.";
  else if (pct >= 0.7) msg = "Sharp eye — most of the sneaky ones didn't get past you.";
  else if (pct >= 0.5) msg = "Solid run. The tricky shades in the back half are rough.";

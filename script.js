///////////////////
// ELEMENTS //
///////////////////

let avg = [];
let sb = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let ad = [];
const imgPortrait = document.querySelector(".img-portrait");
const imgSprite = document.querySelector(".img-class");
const charSelector = document.querySelector(".select-choose");
const btnCalc = document.querySelector(".btn-calc");
let selected;
const classEl = document.getElementById("cls");
const affinityEl = document.getElementById("aff");
const levelInput = document.querySelector(".lvl-in");
const ppInput = document.querySelector(".pp-in");
const arCheckbox = document.querySelector("[name=ar-cb]");
const edCheckbox = document.querySelector("[name=ed-cb]");
const sbCheckbox = document.querySelector("[name=sb-cb]");
const swCheckbox = document.querySelector("[name=sw-cb]");
const giCheckbox = document.querySelector("[name=gi-cb]");
const dsCheckbox = document.querySelector("[name=ds-cb]");
const tmCheckbox = document.querySelector("[name=tm-cb]");
const bootsCheckbox = document.querySelector("[name=b-cb]");
const brCheckbox = document.querySelector("[name=br-cb]");
const adCheckbox = document.querySelector("[name=ad-cb]");
const ppCheckbox = document.querySelector("[name=pp-cb]");

///////////////////
// DROPDOWN MENU //
///////////////////

charSelector.onchange = function () {
  selected = document.querySelector(".select-choose").value;
  console.log(selected);

  for (let i = 0; i < characters.length; i++) {
    if (selected === characters[i].name) {
      charSelect(characters[i]);
      removeAvgStat(characters[i]);
      baseStat(characters[i]);
      growthRate(characters[i]);
      otherStat(characters[i]);
      imgPortrait.classList.remove("hidden");
      imgPortrait.src = `img/img${i}.png`;
      imgSprite.classList.remove("hidden");
      imgSprite.src = `img/sprite${i}.png`;
      return;
    } else {
      clearStats();
      removeColorAll(characters[i]);
    }
  }
};

///////////////////
// CALCULATE BUTTON //
///////////////////

btnCalc.addEventListener("click", function () {
  avg = [];
  for (let i = 0; i < characters.length; i++) {
    if (selected === characters[i].name) {
      if (!ppCheckbox.checked) {
        calcAvgStat(characters[i], Number(levelInput.value));
        calcOtherStats(characters[i]);
      } else {
        calcOtherStats(characters[i]);
        calcAvgPp(
          characters[i],
          Number(levelInput.value),
          Number(ppInput.value)
        );
      }

      avgStat(characters[i]);
      console.log(levelInput);
      return;
    }
  }
});

///////////////////
// CHECKBOXES //
///////////////////

ppCheckbox.addEventListener("change", function () {
  if (this.checked) {
    ppInput.disabled = false;
  } else {
    ppInput.disabled = true;
  }
});

arCheckbox.addEventListener("change", function () {
  if (this.checked) {
    sb[0] = 7;
  } else {
    sb[0] = 0;
  }
});
edCheckbox.addEventListener("change", function () {
  if (this.checked) {
    sb[1] = 2;
  } else {
    sb[1] = 0;
  }
});
sbCheckbox.addEventListener("change", function () {
  if (this.checked) {
    sb[2] = 2;
  } else {
    sb[2] = 0;
  }
});
swCheckbox.addEventListener("change", function () {
  if (this.checked) {
    sb[3] = 2;
  } else {
    sb[3] = 0;
  }
});
giCheckbox.addEventListener("change", function () {
  if (this.checked) {
    sb[4] = 2;
  } else {
    sb[4] = 0;
  }
});
dsCheckbox.addEventListener("change", function () {
  if (this.checked) {
    sb[5] = 2;
  } else {
    sb[5] = 0;
  }
});
tmCheckbox.addEventListener("change", function () {
  if (this.checked) {
    sb[6] = 2;
  } else {
    sb[6] = 0;
  }
});
bootsCheckbox.addEventListener("change", function () {
  if (this.checked) {
    sb[7] = 2;
  } else {
    sb[7] = 0;
  }
});
brCheckbox.addEventListener("change", function () {
  if (this.checked) {
    sb[8] = 2;
  } else {
    sb[8] = 0;
  }
});
adCheckbox.addEventListener("change", function () {
  if (this.checked) {
    ad = [5, 5, 5, 5, 5, 5, 5];
  } else {
    ad = [0, 0, 0, 0, 0, 0, 0];
  }
});

///////////////////
// FUNCTIONS //
///////////////////

function clearStats() {
  for (let i = 0; i < 7; i++) {
    document.getElementById(`bs-${i}`).textContent = "--";
    document.getElementById(`gr-${i}`).textContent = "[--]";
    document.getElementById(`as-${i}`).textContent = "--";
    document.getElementById(`class`).textContent = "--";
    document.getElementById(`level`).textContent = "--";
    document.getElementById(`hp`).textContent = "--";
    document.getElementById(`mov`).textContent = "--";
    document.getElementById(`con`).textContent = "--";
    document.getElementById(`aid`).textContent = "--";
    document.getElementById(`aff`).textContent = "--";
    imgPortrait.classList.add("hidden");
    imgSprite.classList.add("hidden");
  }
}

function charSelect(character) {
  document.getElementById(`class`).textContent = character.class;
  document.getElementById(`level`).textContent = character.lvl;
  document.getElementById(
    `hp`
  ).textContent = `${character.stats[0]}/${character.stats[0]}`;
}

function baseStat(character) {
  for (let i = 0; i < character.stats.length; i++) {
    document.getElementById(`bs-${i}`).textContent = character.stats[i];
    removeColor(document.getElementById(`bs-${i}`));
    statColor(document.getElementById(`bs-${i}`));
  }
}

function growthRate(character) {
  for (let i = 0; i < character.stats.length; i++) {
    document.getElementById(
      `gr-${i}`
    ).textContent = `[${character.growths[i]}%]`;
    removeColor(document.getElementById(`gr-${i}`));
    growthColor(character.growths[i], document.getElementById(`gr-${i}`));
  }
}

function otherStat(character) {
  document.getElementById(`mov`).textContent = character.mov;
  document.getElementById(`con`).textContent = character.con;
  document.getElementById(`aid`).textContent = character.aid;
  document.getElementById(`aff`).src = character.aff;
  document.getElementById(`affAvg`).src = character.aff;
  document.getElementById(`aff`).classList.remove("hidden");
  document.getElementById(`affAvg`).classList.remove("hidden");
}

function avgStat(character) {
  for (let i = 0; i < character.stats.length; i++) {
    document.getElementById(`as-${i}`).textContent = avg[i];
    removeColor(document.getElementById(`as-${i}`));
    statColor(document.getElementById(`as-${i}`));
  }
}

function removeAvgStat(character) {
  for (let i = 0; i < character.stats.length; i++) {
    document.getElementById(`as-${i}`).textContent = "--";
    removeColor(document.getElementById(`as-${i}`));
  }
}

function removeColorAll(character) {
  for (let i = 0; i < character.stats.length; i++) {
    removeColor(document.getElementById(`gr-${i}`));
    removeColor(document.getElementById(`bs-${i}`));
    removeColor(document.getElementById(`as-${i}`));
  }
}

function calcAvgStat(character, level) {
  for (let i = 0; i < character.stats.length; i++) {
    let num =
      character.stats[i] +
      (character.growths[i] / 100) * (level - character.lvl) +
      sb[i];
    num = num.toFixed(1);
    avg.push(num);
  }
}

function calcAvgPp(character, y, x) {
  for (let i = 0; i < character.stats.length; i++) {
    let num =
      character.stats[i] +
      (character.growths[i] / 100) * (y - character.lvl + (x - 1)) +
      character.bonus[i] +
      sb[i];
    num = num.toFixed(1);
    avg.push(num);
  }
}

function calcOtherStats(character) {
  document.getElementById("movAvg").textContent = character.mov + sb[7];
  document.getElementById("conAvg").textContent = character.con + sb[8];
  document.getElementById("aidAvg").textContent = character.aid + sb[8];
}

function growthColor(growth, stat) {
  if (growth >= 60) {
    stat.classList.add("grn");
  } else if (growth >= 40) {
    stat.classList.add("orn");
  } else {
    stat.classList.add("red");
  }
}

function statColor(stat) {
  if (stat.textContent >= 15) {
    stat.classList.add("grn");
  } else if (stat.textContent >= 5) {
    stat.classList.add("orn");
  } else {
    stat.classList.add("red");
  }
}

function removeColor(stat) {
  stat.classList.remove("grn");
  stat.classList.remove("red");
  stat.classList.remove("orn");
}

///////////////////
// CHARACTER ARRAYS //
///////////////////

const characters = [
  {
    name: "lyn",
    lvl: 1,
    class: "Lord",
    mov: 5,
    con: 6,
    aid: 5,
    aff: "img/wind.png",
    stats: [16, 4, 7, 9, 5, 2, 0],
    growths: [70, 40, 60, 60, 55, 20, 30],
    bonus: [3, 2, 2, 0, 0, 3, 5],
  },
  {
    name: "eliwood",
    lvl: 1,
    class: "Lord",
    mov: 5,
    con: 7,
    aid: 6,
    aff: "img/anima.png",
    stats: [18, 5, 5, 7, 7, 5, 0],
    growths: [80, 45, 50, 40, 45, 30, 35],
    bonus: [4, 2, 0, 1, 0, 1, 3],
  },
  {
    name: "hector",
    lvl: 1,
    class: "Lord",
    mov: 5,
    con: 13,
    aid: 12,
    aff: "img/thunder.png",
    stats: [19, 7, 4, 5, 3, 8, 0],
    growths: [90, 60, 45, 35, 30, 50, 25],
    bonus: [3, 0, 2, 3, 0, 1, 5],
  },
];

const resultsBMI = document.querySelector(".results__bmi");
const bmiInputs = document.querySelector(".bmi-calc__inputs");
const bmiCategory = document.querySelector(".bmi-category");
const weightRange = document.querySelector(".weight-range");
let currentUnits = "metric";


document.addEventListener("change", e => {
    if (e.target.classList.contains("bmi-calc__units--radio-input")) {
        resultsBMI.innerHTML = "0";
        currentUnits = e.target.classList[1];
        bmiInputs.classList.toggle("imperial");
        bmiCategory.innerHTML = "...";
        weightRange.innerHTML = "...";

        if (currentUnits === "imperial") {
            bmiInputs.innerHTML = imperialDisplay;
        } else {
            bmiInputs.innerHTML = metricDisplay;
        }
    }

    if (e.target.classList.contains("input__field")) {
        if (currentUnits === "metric") {
            const metricResults = calculateMetricBMI();
            if (metricResults) {
                resultsBMI.innerHTML = metricResults["bmi"];
                updateSummary(metricResults["bmi"], metricResults["heightCentimeters"], currentUnits);
            } 
        } else {
            const imperialResults = calculateImperialBMI();

            if (imperialResults) {
                resultsBMI.innerHTML = imperialResults["bmi"];
                updateSummary(imperialResults["bmi"], imperialResults["heightInches"], currentUnits);
            }
        }
    }
})

/**
 * 
 * @returns {object}
 */
const calculateMetricBMI = () => {
    const weight = document.querySelector(".weight-kg");
    const height = document.querySelector(".height-cm");

    if (weight.value === "" || height.value === "")
        return 0;

    const wkg = parseFloat(weight.value);
    const hm = parseFloat(height.value) / 100.0;

    return {"bmi": (wkg / (hm * hm)).toFixed(1), "heightCentimeters": hm * 100};
}

/**
 * 
 * @returns {object}
 */
const calculateImperialBMI = () => {
    const heightFT = document.querySelector(".height-ft");
    const heightIN = document.querySelector(".height-in");
    const weightST = document.querySelector(".weight-st");
    const weightLBS = document.querySelector(".weight-lbs");

    if (weightST.value === "" || weightLBS.value === "" || heightFT.value === "" || heightIN.value === "")
        return 0;

    const wlbs = parseFloat(weightST.value) * 14.0 + parseFloat(weightLBS.value);
    const hin = parseFloat(heightFT.value) * 12.0 + parseFloat(heightIN.value);

    return {"bmi": (703.0 * (wlbs / (hin * hin))).toFixed(1), "heightInches": hin};
}

const metricDisplay = `
    <label class="user-input">
        <span class="description">Height</span>
        <span class="input">
            <input type="number" class="input__field height-cm" min="0" name="height-cm">
            <span class="input__unit">cm</span>
        </span>
    </label>
    
    <label class="user-input">
        <span class="description">Weight</span>
        <span class="input">
            <input type="number" class="input__field weight-kg" min="0" name="weight-kg">
            <span class="input__unit">kg</span>
        </span>
    </label>    
`;

const imperialDisplay = `
    <label class="user-input">
        <span class="description">Height</span>
        <span class="input">
            <input type="number" class="input__field height-ft" min="0" name="height-ft">
            <span class="input__unit">ft</span>
        </span>

        <span class="input">
            <input type="number" class="input__field height-in" min="0" name="height-in">
            <span class="input__unit">in</span>
        </span>
    </label>
    
    <label class="user-input">
        <span class="description">Weight</span>
        <span class="input">
            <input type="number" class="input__field weight-st" min="0" name="weight-st">
            <span class="input__unit">st</span>
        </span>

        <span class="input">
            <input type="number" class="input__field weight-lbs" min="0" name="weight-lbs">
            <span class="input__unit">lbs</span>
        </span>
    </label>
`;

const idealWeightByHeight = {
    "heights": {
        "58": {"low": 91, "high": 115},
        "59": {"low": 94, "high": 119},
        "60": {"low": 97, "high": 123},
        "61": {"low": 100, "high": 127},
        "62": {"low": 104, "high": 131},
        "63": {"low": 107, "high": 135},
        "64": {"low": 110, "high": 140},
        "65": {"low": 114, "high": 144},
        "66": {"low": 118, "high": 148},
        "67": {"low": 121, "high": 153},
        "68": {"low": 125, "high": 158},
        "69": {"low": 128, "high": 162},
        "70": {"low": 132, "high": 167},
        "71": {"low": 136, "high": 172},
        "72": {"low": 140, "high": 177},
        "73": {"low": 144, "high": 182},
        "74": {"low": 148, "high": 186},
        "75": {"low": 152, "high": 192},
        "76": {"low": 156, "high": 197}
    },

    "conversion": {
        "cmToInch": 0.3937008,
        "lbsToKg": 0.4535924
    }
}

/**
 * 
 * @param {number} - calculated bmi
 * @param {number} height - height in inches
 * @param {string} units - height unit type (imperial / metric)
 */
const updateSummary = (bmi, height, units) => {
    const categoryString = getBMICategoryString(bmi);
    bmiCategory.innerHTML = categoryString;

    if (units === "imperial") {
        const range = idealWeightByHeight["heights"][height];
        
        const stone = [Math.floor(range["low"] / 14), Math.floor(range["high"] / 14)];
        const lbs = [range["low"] % 14, range["high"] % 14];

        const html = `${stone[0]}st ${lbs[0]}lbs - ${stone[1]}st ${lbs[1]}lbs`;
        weightRange.innerHTML = html;
    } else {
        console.log(height);
        height = Math.floor(idealWeightByHeight["conversion"]["cmToInch"] * height);
        console.log(height);
        const range = idealWeightByHeight["heights"][height];

        const kgs = [
            (idealWeightByHeight["conversion"]["lbsToKg"] * range["low"]).toFixed(1),
            (idealWeightByHeight["conversion"]["lbsToKg"] * range["high"]).toFixed(1)
        ];

        const html = `${kgs[0]}kgs - ${kgs[1]}kgs`;
        weightRange.innerHTML = html;
    }
}

/**
 * 
 * @param {number} bmi 
 * @returns {string}
 */
const getBMICategoryString = (bmi) => {
    if (bmi < 18.5)
        return "underweight";
    else if (bmi >= 18.5 && bmi <= 24.9)
        return "a healthy weight";
    else if (bmi >= 25 && bmi <= 29.9)
        return "overweight";
    else
        return "obese";
}
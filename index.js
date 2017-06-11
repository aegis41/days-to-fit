

function showit() {
    const el_sex = document.getElementById("sex");
    const el_age = document.getElementById("age");
    const el_hgt_ft = document.getElementById("height-feet");
    const el_hgt_in = document.getElementById("height-inches");
    const el_wgt_lbs = document.getElementById("weight-pounds");
    const el_goal_wgt_lbs = document.getElementById("goal-weight-pounds");
    const el_activity = document.getElementById("active-level");
    const el_bmr_result = document.getElementById("bmr-result");
    const el_amr_result = document.getElementById("amr-result");
    const el_bmr_goal_result = document.getElementById("bmr-goal-result");
    const el_amr_goal_result = document.getElementById("amr-goal-result");
    const el_total_days = document.getElementById("total-days");
    const el_table_body = document.getElementById("table-body");

    let sex = parseInt(el_sex.value);
    let age = parseInt(el_age.value);
    let hgt_ft = parseInt(el_hgt_ft.value);
    let hgt_in = parseInt(el_hgt_in.value);
    let wgt_lbs = parseInt(el_wgt_lbs.value);
    let goal_wgt_lbs = parseInt(el_goal_wgt_lbs.value);
    let activity = parseFloat(el_activity.value);
    let hgt = hgt_ft * 12 + hgt_in;
    let results = [];

    results = getResults(sex, age, wgt_lbs, hgt, goal_wgt_lbs, activity);

    el_bmr_result.innerHTML = "Basal Metabolic Rate (BMR):" + results[0].bmr;
    el_amr_result.innerHTML = "Active Metabolic Rate (AMR):" + results[0].amr;
    el_bmr_goal_result.innerHTML = "Goal BMR: " + results[0].goal_bmr;
    el_amr_goal_result.innerHTML = "Goal AMR: " + results[0].goal_amr;
    el_total_days.innerHTML = "Total Days: " + results.length;
    for (let i = 0; i < results.length; i++) {
        let newRow = el_table_body.insertRow(i);
        let dayCell = newRow.insertCell(0);
        let weightCell = newRow.insertCell(1);
        let bmrCell = newRow.insertCell(2);
        let amrCell = newRow.insertCell(3);
        let goalBmrCell = newRow.insertCell(4);
        let goalAmrCell = newRow.insertCell(5);
        let calorieCell = newRow.insertCell(6);
        let expectedCell = newRow.insertCell(7);
        dayCell.innerHTML = results[i].day;
        weightCell.innerHTML = results[i].weight.toFixed(2);
        bmrCell.innerHTML = results[i].bmr;
        amrCell.innerHTML = results[i].amr;
        goalBmrCell.innerHTML = results[i].goal_bmr;
        goalAmrCell.innerHTML = results[i].goal_amr;
        calorieCell.innerHTML = results[i].cal_deficit;
        expectedCell.innerHTML = results[i].expected_loss.toFixed(2);
    }
}

function getBMR(sex, age, weight, height) {
    let sex_mod;
    let age_mod;
    let hgt_mod;
    let wgt_mod;
    let bmr;
    let amr;

    if (sex === 1) {
        sex_mod = 66;
        age_mod = 6.8;
        hgt_mod = 12.7;
        wgt_mod = 6.23;
    } else {
        sex_mod = 655;
        age_mod = 4.7;
        hgt_mod = 4.7;
        wgt_mod = 4.35;
    }

    return Math.round(sex_mod + (weight * wgt_mod) + (height * hgt_mod) - (age * age_mod));
}

function getResults (sex, age, weight, height, goal, activity) {
    let results = [];
    let bmr;
    let amr;
    let goal_bmr;
    let goal_amr;
    let cal_deficit;
    let expected_loss;
    let result;
    let i = 0;
   
    //for (let i = 0; i < 365; i++) {
    while (weight > goal + 1) {
        if (i > 0) {
            weight = weight - expected_loss;
        }
        bmr = getBMR(sex, age, Math.round(weight), height);
        amr = Math.round(bmr * activity);
        goal_bmr = getBMR(sex, age, goal, height);
        goal_amr = Math.round(goal_bmr * activity);
        cal_deficit = amr - goal_bmr;
        expected_loss = Math.round(cal_deficit/3500 * 100) / 100;
        result = {
            day: i + 1,
            weight: Math.round(weight * 100) / 100,
            bmr: bmr,
            amr: amr,
            goal_bmr: goal_bmr,
            goal_amr: goal_amr,
            cal_deficit: cal_deficit,
            expected_loss: expected_loss
        };
        results.push(result);
        i++;
    }
    return results;
}

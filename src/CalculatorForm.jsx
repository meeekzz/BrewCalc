import { useState, useEffect, useCallback } from 'react';
import './CalculatorForm.css';

function CalculatorForm() {

  const [desc, setDesc] = useState({
    input1: "activeFerm",
    input2: "activeFerm",
    input3: "activeFerm",
    input4: "activeFerm",
    input5: "activeFerm",
    input6: "activeFerm",
    input7: "activeFerm",
    input8: "activeFerm",
  });

  const [qtyValues, setQtyValues] = useState({
    input1: 0,
    input2: 0,
    input3: 0,
    input4: 0,
    input5: 0,
    input6: 0,
    input7: 0,
    input8: 0,
  });

  const [sizeValues, setSizeValues] = useState({
    input1: 0,
    input2: 0,
    input3: 0,
    input4: 0,
    input5: 0,
    input6: 0,
    input7: 0,
    input8: 0,
  });

  const [totalBbl, setTotalBbl] = useState({
    input1: 0,
    input2: 0,
    input3: 0,
    input4: 0,
    input5: 0,
    input6: 0,
    input7: 0,
    input8: 0,
  });

  const [bblTot, setBblTot] = useState(0);
  const [totVass, setTotVass] = useState(0);
  const [fermTemp, setFermTemp] = useState(68);
  const [totHrsKnock, setTotHrsKnock] = useState(24);
  const [desireTemp, setDesireTemp] = useState(33);
  const [holdTemp, setHoldTemp] = useState(33);
  const [ambientTemp, setAmbientTemp] = useState(90);
  const [coldLiqTank, setColdLiqTank] = useState('No');
  const [cltSize, setCltSize] = useState('');
  const [cltWaterTemp, setCltWaterTemp] = useState(70);
  const [cltTime, setCltTime] = useState(12);
  const [cltCoolTemp, setCltCoolTemp] = useState(40);
  const [wortWaterSupply, setWortWaterSupply] = useState(70);
  const [wortCool, setWortCool] = useState('No');
  const [wortBbl, setWortBbl] = useState('');
  const [transferTime, setTransferTime] = useState('30')
  const [knockoutTemp, setKnockoutTemp] = useState(68);
  const [walkInCool, setWalkInCool] = useState('No');
  const [walkInRoomTemp, setWalkInRoomTemp] = useState(38);
  const [walkInGlycolTemp, setWalkInGlycolTemp] = useState(28);
  const [walkInLength, setWalkInLength] = useState('');
  const [walkInWidth, setWalkInWidth] = useState('');
  const [walkInHeight, setWalkInHeight] = useState('');
  const [activeFerm, setActiveFerm] = useState(0);
  const [activeFermCount, setActiveFermCount] = useState(0);
  const [crashCooling, setCrashCooling] = useState(0);
  const [crashCoolingCount, setCrashCoolingCount] = useState(0);
  const [holdingLoad, setHoldingLoad] = useState(0);
  const [holdingLoadCount, setHoldingLoadCount] = useState(0);
  const [activeBtuHour, setActiveBtuHour] = useState(0);
  const [knockdownBtuHour, setKnockdownBtuHour] = useState(0);
  const [cltBtuHour, setCltBtuHour] = useState(0);
  const [sqFtFerminterPull, setSqFtFerminterPull] = useState(0);
  const [pulldownBtuHour, setPulldownBtuHour] = useState(0);
  const [sqFtFerminterHold, setSqFtFerminterHold] = useState(0);
  const [holdingBtuHour, setHoldingBtuHour] = useState(0);
  const [totalCool, setTotalCool] = useState(0);
  

  const [cellarTotal,   setCellarTotal] = useState(0);
  const [walkInTotal,   setWalkInTotal] = useState(0);
  const [wortTotal,   setWortTotal] = useState(0);



  // Calculate each row total by multiplying each Quantity of Vessels by its corresponding Size in BBL
  const calculateTotal = useCallback(() => {
    const newTotalBbl = Object.keys(qtyValues).reduce((acc, key) => {
      const qtyValue = qtyValues[key];
      const sizeValue = sizeValues[key];
      const product = qtyValue * sizeValue;
      walkInCalc();
      wortCalc();
      cellarCalc();
      liquorLoad();
      fermLoad();
      knockdownLoad();
      pulldownLoad();
      holdingLoadFunc();
      totalCoolCalc();
      return {
        ...acc,
        [key]: product,
      };
    }, {});
    // Set the overall total in totalBbl state
    setTotalBbl(newTotalBbl);
    // Calculate the sum of all key values in newTotalBbl and set it to bblTot
    const overallTotal = Object.values(newTotalBbl).reduce(
      (acc, value) => acc + value,
      0
    );
    setBblTot(overallTotal);
  }, [qtyValues, sizeValues, setTotalBbl, setBblTot]);

  useEffect(() => {
    calculateTotal();
  }, [qtyValues, sizeValues, calculateTotal]);

  useEffect(() => {
   handleDescription(); handleSelectChange; totalCoolCalc(); cellarCalc(); walkInCalc(); wortCalc()
  }, [qtyValues, sizeValues, calculateTotal, totalBbl, desc]);

  const handleQtyChange = (inputName, value) => {
    setQtyValues((prevInputValues) => {
      const updatedValues = {
        ...prevInputValues,
        [inputName]: parseFloat(value) || 0,
      };
      const newTotal = Object.values(updatedValues).reduce(
        (acc, currentValue) => acc + currentValue,
        0
      );
      setTotVass(newTotal);
      return updatedValues;
    });
  };

  const handleSizeChange = (inputName, value) => {
    setSizeValues((prevInputValues) => {
      const updatedValues = {
        ...prevInputValues,
        [inputName]: parseFloat(value) || 0,
      };
      return updatedValues;
    });
  };

  const handleDescription = () => {
    setActiveFerm(0);
    setActiveFermCount(0);
    setCrashCooling(0);
    setCrashCoolingCount(0);
    setHoldingLoad(0);
    setHoldingLoadCount(0);
    let activeTotal = 0;
    let activeCount = 0
    let crashTotal = 0;
    let crashCount = 0;
    let holdingTotal = 0;
    let holdingCount = 0;
    for(let i=1;i<=8;i++){
      const inputName = `input${i}`;
      if(desc[inputName] === "activeFerm"){
        activeTotal += totalBbl[inputName];
        activeCount += qtyValues[inputName];
      }
      else if(desc[inputName] === "crashCooling"){
        crashTotal += totalBbl[inputName];
        crashCount += qtyValues[inputName];
      }
      else if(desc[inputName] === "holdingLoad"){
        holdingTotal += totalBbl[inputName];
        holdingCount += qtyValues[inputName];
      }
    }
    setActiveFerm(activeTotal);
    setActiveFermCount(activeCount);
    setCrashCooling(crashTotal);
    setCrashCoolingCount(crashCount);
    setHoldingLoad(holdingTotal);
    setHoldingLoadCount(holdingCount);
  }

  const handleSelectChange = (index, selectedValue) => {
    setDesc(prevDesc => ({
      ...prevDesc,
      [`input${index}`]: selectedValue
    }));
  };


//Fermintation Load
const fermLoad = () => {
  let fermentationTime = 72;
  setActiveBtuHour(((activeFerm*15) * (280)) / fermentationTime );
}

//Knockdown Load
const knockdownLoad = () => {
  let knockdownMultiply = (crashCooling*31)*(9)*(0.9);
  let fermTempDif = fermTemp - desireTemp
  let knockTot = knockdownMultiply * fermTempDif
  setKnockdownBtuHour(knockTot / totHrsKnock);
  console.log()
}

//Cold Liquor Tank
const liquorLoad = () => {
  let load = (cltSize * 31) * (9) * (.9)
  //Temp Difference
  let tempDif =  cltWaterTemp - cltCoolTemp;
  //Load * Temp Dif / Pulldown Time
   setCltBtuHour(Math.round((load * tempDif)/(cltTime)*1.15*1.3)); 
}

//Pulldown Load
const pulldownLoad = () => {
  let avgVass = bblTot/totVass;
    const avgValues = {
      1: 5,
      5: 15,
      7: 30,
      10: 50,
      15: 75,
      20: 100,
      30: 150,
      40: 200,
      50: 250,
      60: 300,
      80: 375,
      90: 425,
      100: 500,
      120: 600,
      240: 1100
  };
  
  // Find the appropriate key based on avgVass
  let key = Object.keys(avgValues)
  .sort((a, b) => b - a) // Sort keys in descending order
  .find(k => k <= avgVass);

// If no key is found, use the smallest key
if (!key) {
  key = Math.min(...Object.keys(avgValues));
}

  setSqFtFerminterPull(avgValues[key]);
  let sqFtPull = ((sqFtFerminterPull * crashCoolingCount) * (0.15));
  let totBtu = ((ambientTemp - holdTemp) /2 );
  setPulldownBtuHour(totBtu * sqFtPull);
}

//Holding Load
const holdingLoadFunc = () => {
  let avgVass = Math.round(bblTot/totVass);
    const avgValues = {
      1: 5,
      5: 15,
      7: 30,
      10: 50,
      15: 75,
      20: 100,
      30: 150,
      40: 200,
      50: 250,
      60: 300,
      80: 375,
      90: 425,
      100: 500,
      120: 600,
      240: 1100
  };
  
  // Find the appropriate key based on avgVass
  let key = Object.keys(avgValues)
  .sort((a, b) => b - a) // Sort keys in descending order
  .find(k => k <= avgVass);

// If no key is found, use the smallest key
if (!key) {
  key = Math.min(...Object.keys(avgValues));
}

  setSqFtFerminterHold(avgValues[key]);
  let sqFtHold = ((sqFtFerminterHold * holdingLoadCount) * (0.15));
  let tempDifHold = ambientTemp - holdTemp;
  setHoldingBtuHour(sqFtHold * tempDifHold);
}


//WalkIn Cooler
const walkInCalc = () => { 
  setWalkInTotal(Math.round(((walkInLength*walkInWidth)+(walkInWidth*walkInHeight)+(walkInLength*walkInHeight))*2*14*(1.15*1.3)));
};


//Wort Cooling
const wortCalc = () => {
  let wortTempDif =  (wortWaterSupply + 10) - knockoutTemp;
  let wortNumber = ((wortBbl * 31) / transferTime) * (wortTempDif * 500);
  setWortTotal(Math.round(wortNumber * 1.15*1.3));
}

//Cellar Cooling Req
const cellarCalc = () => {
  setCellarTotal(Math.round((activeBtuHour + knockdownBtuHour + pulldownBtuHour + holdingBtuHour) * 1.15 * 1.3));
  console.log(activeBtuHour, knockdownBtuHour, pulldownBtuHour, holdingBtuHour);
}


const totalCoolCalc = () => {
  setTotalCool(cellarTotal+ cltBtuHour + walkInTotal + wortTotal);
}



  return (
    <div>
        <div className="form-style-1">
          <form id="survey" className="">
              
            <div className="flex flex-row text-xs ">    
              <div className="flex-row basis-1/3 p-2 ">
                <div className="text-lg">
                  <b className="">Active Fermentation</b>
                </div>
                <div className="flex flex-row mt-4 justify-center">
                  <div className="mt-1">
                    <b className="">Fermintation Temp (°F):</b>
                  </div>
                  <input
                    type="text"
                    className="fermTemp w-10 h-6"
                    id="fermTemp"
                    value={fermTemp}
                    onChange={(e) => setFermTemp(e.target.value)}
                  />
                </div>
              </div>

              <div className="basis-1/3 p-2">
                <div className="text-lg">
                  <b>Crash Cooling</b>
                </div>
                  <div className="flex flex-row justify-center">
                    <div className="mt-1">
                      <b>Cooling Duration (hrs):</b>
                    </div>
                    <input
                      type="text"
                      className="totHrsKnock w-10 h-6"
                      id="totHrsKnock"
                      value={totHrsKnock}
                      onChange={(e) => setTotHrsKnock(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-row justify-center">
                    <div className="my-1 pe-3">
                      <b>Temp To Cool To (°F):</b>
                    </div>
                    <input
                      type="text"
                      className="desireTemp w-10 h-6"
                      id="desireTemp"
                      value={desireTemp}
                      onChange={(e) => setDesireTemp(e.target.value)}
                    />
                  </div>
              </div>

              <div className="basis-1/3 p-2">
                <div className="text-lg">
                  <b>Holding Load</b>
                </div>
                <div className="flex flex-row justify-center">
                  <div className="my-1 pe-1">
                    <b>Holding Temp (°F)</b>
                  </div>
                  <input
                    type="text"
                    className="holdTemp w-10 h-6"
                    id="holdTemp"
                    value={holdTemp}
                    onChange={(e) => setHoldTemp(e.target.value)}
                  />
                </div>

                <div className="flex flex-row justify-center">
                  <div className="my-1">
                    <b>Ambient Temp (°F)</b>
                  </div>
                  <input
                    type="text"
                    className="ambientTemp w-10 h-6 "
                    id="ambientTemp"
                    value={ambientTemp}
                    placeholder="90"
                    onChange={(e) => setAmbientTemp(e.target.value)}
                  />
                </div>
              </div>
            </div>  


            <div className="flex justify-center">     
              <fieldset className="basis-5/7">
                <div className="">
                  <table id="surveytab" >
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Tanks Size</th>
                    <tbody className="surveytr text-xs">
                      <td>
                        <select key={1} id="hear" onChange={(e) => handleSelectChange(1, e.target.value)}>
                          <option  value="activeFerm" >Active Fermentation</option>
                          <option  value="crashCooling">Crash Cooling</option>
                          <option  value="holdingLoad">Holding Load</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="qt1"
                          id="quanVes1"
                          value={qtyValues.input1}
                          placeholder="6 EA"
                          onChange={(e) =>
                            handleQtyChange('input1', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="sz1"
                          id="szBbl1"
                          value={sizeValues.input1}
                          placeholder="15 BBL"
                          onChange={(e) =>
                            handleSizeChange('input1', e.target.value)
                          }
                        />
                      </td>
                    </tbody>
                    <tbody className="surveytr text-xs">
                      <td>
                        <select key={2}id="hear" className="hear" onChange={(e) => handleSelectChange(2, e.target.value)}>
                          <option value="activeFerm" >Active Fermentation</option>
                          <option value="crashCooling">Crash Cooling</option>
                          <option value="holdingLoad">Holding Load</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="qt1"
                          id="quanVes2"
                          value={qtyValues.input2}
                          placeholder="6 EA"
                          onChange={(e) =>
                            handleQtyChange('input2', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="sz1"
                          id="szBbl2"
                          value={sizeValues.input2}
                          placeholder="15 BBL"
                          onChange={(e) =>
                            handleSizeChange('input2', e.target.value)
                          }
                        />
                      </td>
                    </tbody>
                    <tbody className="surveytr text-xs">
                      <td>
                        <select key={3} id="hear" onChange={(e) => handleSelectChange(3, e.target.value)}>
                          <option value="activeFerm" >Active Fermentation</option>
                          <option value="crashCooling">Crash Cooling</option>
                          <option value="holdingLoad">Holding Load</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="qt1"
                          id="quanVes3"
                          value={qtyValues.input3}
                          placeholder="6 EA"
                          onChange={(e) =>
                            handleQtyChange('input3', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="sz1"
                          id="szBbl3"
                          value={sizeValues.input3}
                          placeholder="15 BBL"
                          onChange={(e) =>
                            handleSizeChange('input3', e.target.value)
                          }
                        />
                      </td>
                    </tbody>
                    <tbody className="surveytr text-xs">
                      <td>
                        <select key={4} id="hear" onChange={(e) => handleSelectChange(4, e.target.value)}>
                          <option value="activeFerm">Active Fermentation</option>
                          <option value="crashCooling">Crash Cooling</option>
                          <option value="holdingLoad">Holding Load</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="qt1"
                          id="quanVes4"
                          value={qtyValues.input4}
                          placeholder="6 EA"
                          onChange={(e) =>
                            handleQtyChange('input4', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="sz1"
                          id="szBbl4"
                          value={sizeValues.input4}
                          placeholder="15 BBL"
                          onChange={(e) =>
                            handleSizeChange('input4', e.target.value)
                          }
                        />
                      </td>
                    </tbody>
                    <tbody className="surveytr text-xs">
                      <td>
                        <select key={5} id="hear" onChange={(e) => handleSelectChange(5, e.target.value)}>
                          <option value="activeFerm" >Active Fermentation</option>
                          <option value="crashCooling">Crash Cooling</option>
                          <option value="holdingLoad">Holding Load</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="qt1"
                          id="quanVes5"
                          value={qtyValues.input5}
                          placeholder="6 EA"
                          onChange={(e) =>
                            handleQtyChange('input5', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="sz1"
                          id="szBbl5"
                          value={sizeValues.input5}
                          placeholder="15 BBL"
                          onChange={(e) =>
                            handleSizeChange('input5', e.target.value)
                          }
                        />
                      </td>
                    </tbody>
                    <tr className="surveytr text-xs">
                      <td>
                        <select key={6} id="hear" onChange={(e) => handleSelectChange(6, e.target.value)}>
                          <option value="activeFerm" >Active Fermentation</option>
                          <option value="crashCooling">Crash Cooling</option>
                          <option value="holdingLoad">Holding Load</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="qt1"
                          id="quanVes6"
                          value={qtyValues.input6}
                          placeholder="6 EA"
                          onChange={(e) =>
                            handleQtyChange('input6', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          id="szBbl6"
                          value={sizeValues.input6}
                          placeholder="15 BBL"
                          onChange={(e) =>
                            handleSizeChange('input6', e.target.value)
                          }
                        />
                      </td>
                    </tr>
                    <tr className="surveytr text-xs">
                      <td>
                        <select key={7} id="hear" onChange={(e) => handleSelectChange(7, e.target.value)}>
                          <option value="activeFerm">Active Fermentation</option>
                          <option value="crashCooling">Crash Cooling</option>
                          <option value="holdingLoad">Holding Load</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="qt1"
                          id="quanVes7"
                          value={qtyValues.input7}
                          placeholder="6 EA"
                          onChange={(e) =>
                            handleQtyChange('input7', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="sz1"
                          id="szBbl7"
                          value={sizeValues.input7}
                          placeholder="15 BBL"
                          onChange={(e) =>
                            handleSizeChange('input7', e.target.value)
                          }
                        />
                      </td>
                    </tr>
                    <tr className="surveytr text-xs">
                      <td>
                        <select key={8} id="hear" onChange={(e) => handleSelectChange(8, e.target.value)}>
                          <option value="activeFerm">Active Fermentation</option>
                          <option value="crashCooling">Crash Cooling</option>
                          <option value="holdingLoad">Holding Load</option>
                        </select>
                      </td>
                      <td>
                        <input
                          type="text"
                          className="qt1"
                          id="quanVes8"
                          value={qtyValues.input8}
                          placeholder="6 EA"
                          onChange={(e) =>
                            handleQtyChange('input8', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="sz1"
                          id="szBbl8"
                          value={sizeValues.input8}
                          placeholder="15 BBL"
                          onChange={(e) =>
                            handleSizeChange('input8', e.target.value)
                          }
                        />
                      </td>
                    </tr>
                  </table>
                </div>
              </fieldset>
              <div className="basis-2/7 text-xs p-2"> 
                <div></div>
                <div className="">
                  <div className="">
                    <b>Cellar Cooling Requirement</b>
                  </div>
                  <input
                    type="text"
                    className=""
                    value={cellarTotal}
                    readOnly
                  />
                </div>
                <div className="">
                  <div className="">
                    <b>Cold Liquor Cooling Required</b>
                  </div>
                  <input
                    type="text"
                    className=""
                    value={cltBtuHour}
                    readOnly
                    
                  />
                </div>
                <div className="">
                  <div className="">
                    <b>Walk-In Cooler Requirement</b>
                  </div>
                  <input
                    type="text"
                    className=""
                    value={walkInTotal}
                    readOnly
                  />
                </div>
                <div className="">
                  <div className="">
                    <b>2 Stage Wort Cooler Requirement</b>
                  </div>
                  <input
                    type="text"
                    className=""
                    value={wortTotal}
                    readOnly
                  />
                </div>
                <div className="">
                  <div className="">
                    <b>Total Cooling Requirement</b>
                  </div>
                  <input
                    type="text"
                    className=""
                    value={totalCool}
                    readOnly
                  />
                </div>
                <div className="">
                  <div className="">
                    <b>Recommended Chiller</b>
                  </div>
                  <input
                    type="text"
                    className=""
                    value={knockoutTemp}
                    readOnly
                  />
                </div>
                <div></div>
              </div>    
            </div>            


            <br />
            <div className="flex flex-row text-xs">
              <div className="basis-1/4 p-2 flex">
                <div className=" pt-2">  
                  <b>Total BBL Active:</b>
                </div>           
                <input
                    type="text"
                    className=" w-10 h-6"
                    id="activeFerm"
                    value={activeFerm}
                    readOnly
                />
              </div>  
              <div className="basis-1/4 p-2 flex">
                <div className="pt-2">
                  <b>Total BBL Crashing:</b>
                </div>
                <input
                  type="text"
                  className="w-10 h-6"
                  id="crashCooling"
                  value={crashCooling}
                  readOnly
                />
              </div>
              <div className="basis-1/4 p-2 flex">  
                <div className="pt-2">
                  <b>Total BBL Holding:</b>
                </div>
                <input
                  type="text"
                  className="w-10 h-6"
                  id="holdingLoad"
                  value={holdingLoad}
                  readOnly
                />
              </div>    
            </div>    



          <div className="flex text-xs">

              <div>
                      <b>Are you using a Cold Liquor Tank?</b>
                      <select
                        id="coldliqtank"
                        onChange={(e) => setColdLiqTank(e.target.value)}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>

                  <div>
                      {coldLiqTank === 'Yes' && (
                        <div id="coldliqtankq">
                          <table className="">
                              <div>
                                <b>Temp to Cool To (°F)</b>
                              </div>
                                <input
                                  type="text"
                                  value={cltCoolTemp}
                                  onChange={(e) => setCltCoolTemp(e.target.value)}
                                />


                            <div>
                              <div>
                                <b>BBL of Cold Liquor</b>
                              </div>
                                <input
                                  type="text"
                                  placeholder="Enter BBL"
                                  value={cltSize}
                                  onChange={(e) => setCltSize(e.target.value)}
                                />
                            </div>

                            <div>
                              <div>
                                <b>Water Supply Temp (°F)</b>
                              </div>
                                <input
                                  type="text"
                                  value={cltWaterTemp}
                                  onChange={(e) => setCltWaterTemp(e.target.value)}
                                />
                            </div>

                            <div>
                              <div>
                                <b>Time to Cool (hrs)</b>
                              </div>
                                <input
                                  type="text"
                                  value={cltTime}
                                  onChange={(e) => setCltTime(e.target.value)}
                                />
                            </div>


                            <tr>
                              <td>
                                <br />
                              </td>
                              <td>
                                <br />
                              </td>
                            </tr>
                          </table>
                        </div>
                      )}
                  </div>
                  <tr>
                    <td>
                      <b>Do you use glycol for your Wort Cooling?</b>
                      <select
                        id="wortcool"
                        onChange={(e) => setWortCool(e.target.value)}
                      >
                        <option value="No" >
                          No
                        </option>
                        <option value="Yes">Yes</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                      {wortCool === 'Yes' && (
                        <div id="wortCoolQ">
                          <table className="form-style-3">
                            <tr>
                              <td>
                                <tr>
                                  <td>
                                    <b>Water Supply Temp (°F)</b>
                                  </td>
                                    <td>
                                      <input
                                        type="text"
                                        value={wortWaterSupply}
                                        onChange={(e) => setWortWaterSupply(e.target.value)}
                                      />
                                    </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>BBl of Wort</b>
                                  </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder="BBL"
                                        value={wortBbl}
                                        onChange={(e) => setWortBbl(e.target.value)}
                                      />
                                    </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Transfer Time of Wort</b>
                                  </td>
                                    <td>
                                      <select
                                        onChange={(e) => setTransferTime(e.target.value)}>
                                        <option value={30}>30 Min</option>
                                        <option value={45}>45 Min</option>
                                        <option value={60}>60 Min</option>
                                      </select>
                                    </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Knockout Temp (°F)</b>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      value={knockoutTemp}
                                      onChange={(e) => setKnockoutTemp(e.target.value)}
                                    />
                                  </td>
                                </tr> 
                              </td>
                            </tr>
                          </table>
                        </div>
                      )}
                  </tr>
                  <tr>
                      <b>Do you have a Walk-In Cooler?</b>
                      <select
                        id="walkincool"
                        onChange={(e) => setWalkInCool(e.target.value)}
                      >
                        <option value="No" >No</option>
                        <option value="Yes">Yes</option>
                      </select>
                  </tr>
                  <tr>
                      {walkInCool === 'Yes' && (
                        <div id="walkincoolq">
                          <table className="form-style-3">
                            <tr>
                              <td>
                                <tr>
                                  <td>
                                    <b>Room Temp (°F)</b>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      value={walkInRoomTemp}
                                      onChange={(e) => setWalkInRoomTemp(e.target.value)}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Glycol Temp (°F)</b>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      value={walkInGlycolTemp}
                                      onChange={(e) => setWalkInGlycolTemp(e.target.value)}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <b>Length</b>
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Length"
                                      value={walkInLength}
                                      onChange={(e) => setWalkInLength(e.target.value)}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td><b>Width</b></td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Width"
                                      value={walkInWidth}
                                      onChange={(e) => setWalkInWidth(e.target.value)}
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td><b>Height</b></td>
                                  <td>
                                    <input
                                      type="text"
                                      placeholder="Height"
                                      value={walkInHeight}
                                      onChange={(e) => setWalkInHeight(e.target.value)}
                                    />
                                  </td>
                                </tr>
                              </td>
                            </tr>
                          </table>
                        </div>
                      )}
                  </tr>
              </div>
            <div className="ml-20">
              <img
                  id="logo"
                  src="https://prochiller.com/wp-content/uploads/2018/05/Pro-Chiller-Logo-Dark-Blue.png"
                />
            </div>
            </div>
          </form>
        </div>
    </div>
  );
}
export default CalculatorForm;
import { useCallback, useEffect, useState } from "react";

const TankInfo = ({ onNext, onPrev, setTotalTanks, setCellarTotal}) => {
    const handlePrev = () => {
        onPrev();
    };
    const handleNext = () => {
        onNext();
        sumQtyValues();
        console.log(holdingLoadCount)
        console.log(activeBtuHour)
    };

    //State
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
      const [activeFerm, setActiveFerm] = useState(0);
      const [activeFermCount, setActiveFermCount] = useState(0);
      const [crashCooling, setCrashCooling] = useState(0);
      const [crashCoolingCount, setCrashCoolingCount] = useState(0);
      const [holdingLoad, setHoldingLoad] = useState(0);
      const [holdingLoadCount, setHoldingLoadCount] = useState(0);
      const [activeBtuHour, setActiveBtuHour] = useState(0);
      const [knockdownBtuHour, setKnockdownBtuHour] = useState(0);
      const [sqFtFerminterPull, setSqFtFerminterPull] = useState(0);
      const [pulldownBtuHour, setPulldownBtuHour] = useState(0);
      const [sqFtFerminterHold, setSqFtFerminterHold] = useState(0);
      const [holdingBtuHour, setHoldingBtuHour] = useState(0);

    //Sets Number Of Tanks
    const sumQtyValues = () => {
        let total = 0;
        for (const key in qtyValues) {
          total += qtyValues[key];
        }
        setTotalTanks(total);
      };

    
  // Calculate each row total by multiplying each Quantity of Vessels by its corresponding Size in BBL
  const calculateTotal = useCallback(() => {
    const newTotalBbl = Object.keys(qtyValues).reduce((acc, key) => {
      const qtyValue = qtyValues[key];
      const sizeValue = sizeValues[key];
      const product = qtyValue * sizeValue;
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
  }, [qtyValues, sizeValues, desc]);

  useEffect(() => {
   handleDescription(); 
  }, [qtyValues, sizeValues, totalBbl, desc]);

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
    useEffect(() => {
        fermLoad();
    }, );

    //Knockdown Load
    const knockdownLoad = () => {
    let knockdownMultiply = (crashCooling*31)*(9)*(0.9);
    let fermTempDif = fermTemp - desireTemp
    let knockTot = knockdownMultiply * fermTempDif
    setKnockdownBtuHour(knockTot / totHrsKnock);
    }
    useEffect(() => {
        knockdownLoad();
    }, );

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
        .find(k => k < avgVass);
        // If no key is found, use the smallest key
        if (!key) {
            key = Math.min(...Object.keys(avgValues));
    }
    setSqFtFerminterPull(avgValues[key]);
        let sqFtPull = ((sqFtFerminterPull * crashCoolingCount) * (0.15));
        let totBtu = ((ambientTemp - holdTemp) /2 );
        setPulldownBtuHour(totBtu * sqFtPull);
    }

    useEffect(() => {
        pulldownLoad();
    }, );

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
    .find(k => k < avgVass);

    // If no key is found, use the smallest key
    if (!key) {
        key = Math.min(...Object.keys(avgValues));
    }

    setSqFtFerminterHold(avgValues[key]);
        let sqFtHold = ((sqFtFerminterHold * holdingLoadCount) * (0.15));
        let tempDifHold = ambientTemp - holdTemp;
        setHoldingBtuHour(sqFtHold * tempDifHold);
    }

    useEffect(() => {
        holdingLoadFunc();
    }, );

    //Cellar Cooling Req
    const cellarCalc = () => {
        setCellarTotal(() => {
        const newCellarTotal = Math.round((activeBtuHour + knockdownBtuHour + pulldownBtuHour + holdingBtuHour) * 1.15 * 1.3);
        return newCellarTotal;
        });
    };

    useEffect(() => {
        cellarCalc();
    }, [activeBtuHour, knockdownBtuHour, pulldownBtuHour, holdingBtuHour]);

    return (
        <div className="">  
            <div className=""> 
                <h2 className="text-xl font-bold underline mb-2">Enter Tank Information</h2>
            </div>
            <div className="">
                <div className="text-center">
                    <table className="ml-5">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Quantity</th>
                                <th className="pr-5">Size (BBL)</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            <tr className="">
                                <td className="">
                                    <select 
                                        key={1} id="hear" 
                                        onChange={(e) => handleSelectChange(1, e.target.value)}
                                        className="bg-white border border-gray-300 rounded-sm text-center w-32"
                                    >
                                        <option  value="activeFerm" >Fermentation</option>
                                        <option  value="crashCooling">Crash Cooling</option>
                                        <option  value="holdingLoad">Holding Load</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center"
                                    id="quanVes1"
                                    value={qtyValues.input1}
                                    placeholder="6 EA"
                                    onChange={(e) => handleQtyChange('input1', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center mr-5"
                                    id="szBbl1"
                                    value={sizeValues.input1}
                                    placeholder="15 BBL"
                                    onChange={(e) => handleSizeChange('input1', e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className="h-6">
                                <td className="">
                                    <select key={2}id="hear"
                                        onChange={(e) => handleSelectChange(2, e.target.value)}
                                        className="bg-white border border-gray-300 rounded-sm text-center w-32"
                                    >
                                    <option value="activeFerm" >Fermentation</option>
                                    <option value="crashCooling">Crash Cooling</option>
                                    <option value="holdingLoad">Holding Load</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center"
                                    id="quanVes2"
                                    value={qtyValues.input2}
                                    placeholder="6 EA"
                                    onChange={(e) => handleQtyChange('input2', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center mr-5"
                                    id="szBbl2"
                                    value={sizeValues.input2}
                                    placeholder="15 BBL"
                                    onChange={(e) => handleSizeChange('input2', e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className="h-6">
                                <td className="">
                                    <select key={3} id="hear" 
                                        onChange={(e) => handleSelectChange(3, e.target.value)}
                                        className="bg-white border border-gray-300 rounded-sm text-center w-32"
                                    >
                                    <option value="activeFerm" >Fermentation</option>
                                    <option value="crashCooling">Crash Cooling</option>
                                    <option value="holdingLoad">Holding Load</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center"
                                    id="quanVes3"
                                    value={qtyValues.input3}
                                    placeholder="6 EA"
                                    onChange={(e) =>handleQtyChange('input3', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center mr-5"
                                    id="szBbl3"
                                    value={sizeValues.input3}
                                    placeholder="15 BBL"
                                    onChange={(e) => handleSizeChange('input3', e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className="h-6">
                                <td className="">
                                    <select key={4} id="hear" 
                                        onChange={(e) => handleSelectChange(4, e.target.value)}
                                        className="bg-white border border-gray-300 rounded-sm text-center w-32"
                                    >
                                    <option value="activeFerm">Fermentation</option>
                                    <option value="crashCooling">Crash Cooling</option>
                                    <option value="holdingLoad">Holding Load</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center"
                                    id="quanVes4"
                                    value={qtyValues.input4}
                                    placeholder="6 EA"
                                    onChange={(e) =>handleQtyChange('input4', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center mr-5"
                                    id="szBbl4"
                                    value={sizeValues.input4}
                                    placeholder="15 BBL"
                                    onChange={(e) =>handleSizeChange('input4', e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className="h-6">
                                <td className="">
                                    <select key={5} id="hear" 
                                        onChange={(e) => handleSelectChange(5, e.target.value)}
                                        className="bg-white border border-gray-300 rounded-sm text-center w-32"
                                    >
                                    <option value="activeFerm" >Fermentation</option>
                                    <option value="crashCooling">Crash Cooling</option>
                                    <option value="holdingLoad">Holding Load</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center"
                                    id="quanVes5"
                                    value={qtyValues.input5}
                                    placeholder="6 EA"
                                    onChange={(e) =>handleQtyChange('input5', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center mr-5"
                                    id="szBbl5"
                                    value={sizeValues.input5}
                                    placeholder="15 BBL"
                                    onChange={(e) =>handleSizeChange('input5', e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className="h-6">
                                <td className="">
                                    <select key={6} id="hear" 
                                        onChange={(e) => handleSelectChange(6, e.target.value)}
                                        className="bg-white border border-gray-300 rounded-sm text-center w-32"
                                    >
                                    <option value="activeFerm" >Fermentation</option>
                                    <option value="crashCooling">Crash Cooling</option>
                                    <option value="holdingLoad">Holding Load</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center"
                                    id="quanVes6"
                                    value={qtyValues.input6}
                                    placeholder="6 EA"
                                    onChange={(e) =>handleQtyChange('input6', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    id="szBbl6"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center mr-5"
                                    value={sizeValues.input6}
                                    placeholder="15 BBL"
                                    onChange={(e) => handleSizeChange('input6', e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className="h-6">
                                <td className="">
                                    <select key={7} id="hear" 
                                        onChange={(e) => handleSelectChange(7, e.target.value)}
                                        className="bg-white border border-gray-300 rounded-sm text-center w-32"
                                    >
                                    <option value="activeFerm">Fermentation</option>
                                    <option value="crashCooling">Crash Cooling</option>
                                    <option value="holdingLoad">Holding Load</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center"
                                    id="quanVes7"
                                    value={qtyValues.input7}
                                    placeholder="6 EA"
                                    onChange={(e) => handleQtyChange('input7', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center mr-5"
                                    id="szBbl7"
                                    value={sizeValues.input7}
                                    placeholder="15 BBL"
                                    onChange={(e) => handleSizeChange('input7', e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr className="">
                                <td className="">
                                    <select key={8} id="hear" 
                                        onChange={(e) => handleSelectChange(8, e.target.value)}
                                        className="bg-white border border-gray-300 rounded-sm text-center w-32"
                                    >
                                    <option value="activeFerm">Fermentation</option>
                                    <option value="crashCooling">Crash Cooling</option>
                                    <option value="holdingLoad">Holding Load</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center"
                                    id="quanVes8"
                                    value={qtyValues.input8}
                                    placeholder="6 EA"
                                    onChange={(e) =>handleQtyChange('input8', e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                    type="text"
                                    className="bg-white border border-gray-300 rounded-sm w-24 text-center mr-5"
                                    id="szBbl8"
                                    value={sizeValues.input8}
                                    placeholder="15 BBL"
                                    onChange={(e) => handleSizeChange('input8', e.target.value)}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <br/> 
                <div className="">    
                    <div className="flex flex-nowrap justify-center my-2">
                        <div className="mr-5">
                            <b className="">Fermentation Temp (°F)</b>
                        </div>
                        <input
                            type="text"
                            className="bg-white border border-gray-300 rounded-sm w-12 text-center"
                            id="fermTemp"
                            value={fermTemp}
                            onChange={(e) => setFermTemp(e.target.value)}
                        />
                </div>
                    <div className="flex flex-nowrap justify-center my-2">
                        <div className="mr-5">
                            <b>Cooling Duration (hrs):</b>
                        </div>
                        <input
                            type="text"
                            className="bg-white border border-gray-300 rounded-sm w-12 text-center"
                            id="totHrsKnock"
                            value={totHrsKnock}
                            onChange={(e) => setTotHrsKnock(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-nowrap justify-center my-2">
                        <div className="mr-5" >
                            <b>Temp To Cool To (°F):</b>
                        </div>
                        <input
                            type="text"
                            className="bg-white border border-gray-300 rounded-sm w-12 text-center"
                            id="desireTemp"
                            value={desireTemp}
                            onChange={(e) => setDesireTemp(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-nowrap justify-center my-2">
                        <div className="mr-5">
                            <b>Holding Temp (°F)</b>
                        </div>
                        <input
                            type="text"
                            className="bg-white border border-gray-300 rounded-sm w-12 text-center"
                            id="holdTemp"
                            value={holdTemp}
                            onChange={(e) => setHoldTemp(e.target.value)}
                        />
                    </div> 
                    <div className="flex flex-nowrap justify-center my-2">
                        <div className="mr-5">
                            <b>Ambient Temp (°F)</b>
                        </div>
                        <input
                            type="text"
                            className="bg-white border border-gray-300 rounded-sm w-12 text-center"
                            id="ambientTemp"
                            value={ambientTemp}
                            onChange={(e) => setAmbientTemp(e.target.value)}
                        />
                    </div>   
                </div>
                <button onClick={handlePrev} className='basis-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Prev Step</button>
                <button onClick={handleNext} className='basis-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Next Step</button>
            </div>
        </div>
    )
}
export default TankInfo;
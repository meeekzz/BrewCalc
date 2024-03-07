import { useState, useEffect, useCallback } from 'react';
import './CalculatorForm.css';

function CalculatorForm() {
  const [companyName, setCompanyName] = useState('');
  const [breweryName, setBreweryName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

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
  const [fermTemp, setFermTemp] = useState('');
  const [totHrsKnock, setTotHrsKnock] = useState('');
  const [desireTemp, setDesireTemp] = useState('');
  const [holdTemp, setHoldTemp] = useState('');
  const [ambientTemp, setAmbientTemp] = useState('');
  const [coldLiqTank, setColdLiqTank] = useState('No');
  const [cltSize, setCltSize] = useState('');
  const [cltTemp, setCltTemp] = useState(70);
  const [cltTime, setCltTime] = useState(12);
  const [cltCoolTemp, setCltCoolTemp] = useState(40);
  const [wortWaterSupply, setWortWaterSupply] = useState(70);
  const [wortCool, setWortCool] = useState('No');
  const [wortBbl, setWortBbl] = useState('');
  const [knockoutTemp, setKnockoutTemp] = useState(68);
  const [walkInCool, setWalkInCool] = useState('No');
  const [walkInRoomTemp, setWalkInRoomTemp] = useState(38);
  const [walkInGlycolTemp, setWalkInGlycolTemp] = useState(28);
  const [walkInLength, setWalkInLength] = useState('');
  const [walkInWidth, setWalkInWidth] = useState('');
  const [walkInHeight, setWalkInHeight] = useState('');
  const [walkInBeer, setWalkInBeer] = useState('');
  const [activeFerm, setActiveFerm] = useState(0);
  const [crashCooling, setCrashCooling] = useState(0);
  const [holdingLoad, setHoldingLoad] = useState(0);

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
  }, [qtyValues, sizeValues, calculateTotal]);

  useEffect(() => {
   handleDescription(); handleSelectChange
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
    setCrashCooling(0);
    setHoldingLoad(0);
    let activeTotal = 0;
    let crashTotal = 0;
    let holdingTotal = 0;
    for(let i=1;i<=8;i++){
      const inputName = `input${i}`;
      if(desc[inputName] === "activeFerm"){
        activeTotal += totalBbl[inputName]
      }
      else if(desc[inputName] === "crashCooling"){
        crashTotal += totalBbl[inputName]
      }
      else if(desc[inputName] === "holdingLoad"){
        holdingTotal += totalBbl[inputName]
      }
    }
    setActiveFerm(activeTotal);
    setCrashCooling(crashTotal);
    setHoldingLoad(holdingTotal);
  }

  const handleSelectChange = (index, selectedValue) => {
    setDesc(prevDesc => ({
      ...prevDesc,
      [`input${index}`]: selectedValue
    }));
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    // Old Page Sent Email with this, use to submit survery form if we want to go that route?
  };

  return (
    <div>
      <section>
        <div className="form-style-1">
          <form id="survey" onSubmit={handleSubmit}>
            <fieldset className="form-style-2">
              <img
                id="logo"
                src="https://prochiller.com/wp-content/uploads/2018/05/Pro-Chiller-Logo-Dark-Blue.png"
              />
              <input
                type="text"
                name="company"
                value={companyName}
                placeholder="Company Name"
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <input
                type="text"
                name="brewery"
                value={breweryName}
                placeholder="Brewery Name"
                onChange={(e) => setBreweryName(e.target.value)}
              />
              <input
                type="text"
                name="name"
                value={name}
                required
                placeholder="Name *"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                name="email"
                value={email}
                required
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>         
            <fieldset>
              <legend>Brewload Calculator</legend>

              <div>
                <table id="surveytab">
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Tanks Size</th>
                  <th>Total BBL</th>
                  <tbody className="surveytr">
                    <td>
                      <select key={1} id="hear" name="hear" onChange={(e) => handleSelectChange(1, e.target.value)}>
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
                        name="quanVes1"
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
                        name="szBbl1"
                        value={sizeValues.input1}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input1', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl1"
                        name="totBbl1"
                        value={totalBbl.input1}
                        readOnly
                      />
                    </td>
                  </tbody>
                  <tbody className="surveytr">
                    <td>
                      <select key={2}id="hear" name="hear" onChange={(e) => handleSelectChange(2, e.target.value)}>
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
                        name="quanVes2"
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
                        name="szBbl2"
                        value={sizeValues.input2}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input2', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl2"
                        name="totBbl2"
                        value={totalBbl.input2}
                        readOnly
                      />
                    </td>
                  </tbody>
                  <tbody className="surveytr">
                    <td>
                      <select key={3} id="hear" name="hear" onChange={(e) => handleSelectChange(3, e.target.value)}>
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
                        name="quanVes3"
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
                        name="szBbl3"
                        value={sizeValues.input3}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input3', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl3"
                        name="totBbl3"
                        value={totalBbl.input3}
                        readOnly
                      />
                    </td>
                  </tbody>
                  <tbody className="surveytr">
                    <td>
                      <select key={4} id="hear" name="hear" onChange={(e) => handleSelectChange(4, e.target.value)}>
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
                        name="quanVes4"
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
                        name="szBbl4"
                        value={sizeValues.input4}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input4', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl4"
                        name="totBbl4"
                        value={totalBbl.input4}
                        readOnly
                      />
                    </td>
                  </tbody>
                  <tbody className="surveytr">
                    <td>
                      <select key={5} id="hear" name="hear" onChange={(e) => handleSelectChange(5, e.target.value)}>
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
                        name="quanVes5"
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
                        name="szBbl5"
                        value={sizeValues.input5}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input5', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl5"
                        name="totBbl5"
                        value={totalBbl.input5}
                        readOnly
                      />
                    </td>
                  </tbody>
                  <tr className="surveytr">
                    <td>
                      <select key={6} id="hear" name="hear" onChange={(e) => handleSelectChange(6, e.target.value)}>
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
                        name="quanVes6"
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
                        name="szBbl6"
                        value={sizeValues.input6}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input6', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl6"
                        name="totBbl6"
                        value={totalBbl.input6}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr className="surveytr">
                    <td>
                      <select key={7} id="hear" name="hear" onChange={(e) => handleSelectChange(7, e.target.value)}>
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
                        name="quanVes7"
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
                        name="szBbl7"
                        value={sizeValues.input7}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input7', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl7"
                        name="totBbl7"
                        value={totalBbl.input7}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr className="surveytr">
                    <td>
                      <select key={8} id="hear" name="hear" onChange={(e) => handleSelectChange(8, e.target.value)}>
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
                        name="quanVes8"
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
                        name="szBbl8"
                        value={sizeValues.input8}
                        placeholder="15 BBL"
                        onChange={(e) =>
                          handleSizeChange('input8', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="totBbl"
                        id="totBbl8"
                        name="totBbl8"
                        value={totalBbl.input8}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Total Vassels</b>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="totvass"
                        name="totvass"
                        value={totVass}
                        readOnly
                      />
                    </td>
                    <td>
                      <b>Total BBLs</b>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="finbbltot"
                        name="finbbltot"
                        value={bblTot}
                        readOnly
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </fieldset>
            <br />
            <fieldset>
              <legend>Load Estimate</legend>
              <div>
                <table>
                  <tr>
                    <th colSpan="2">
                      <b>Active Fermentation</b>
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <b>Total BBL Active:</b>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="activeFerm"
                        className="step2"
                        id="activeFerm"
                        value={activeFerm}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr className="esttr">
                    <td>
                      <b>Fermintation Temp (°F):</b>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="fermtemp"
                        className="fermTemp"
                        id="fermTemp"
                        value={fermTemp}
                        onChange={(e) => setFermTemp(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr className="esttr">
                    <th colSpan="2">
                      <b>Crash Cooling</b>
                    </th>
                  </tr>
                  <tr className="esttr">
                    <td>
                      <b>Total BBL Crashing:</b>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="crashCooling"
                        className="step2"
                        id="crashCooling"
                        value={crashCooling}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        Cooling Duration (hrs):
                      </b>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="totHrsKnock"
                        id="totHrsKnock"
                        placeholder="24"
                        value={totHrsKnock}
                        onChange={(e) => setTotHrsKnock(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        Temp To Cool To (°F):
                      </b>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="desireTemp"
                        id="desireTemp"
                        value={desireTemp}
                        placeholder="30"
                        onChange={(e) => setDesireTemp(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="2">
                      <b>Holding Load</b>
                    </th>
                  </tr>
                  <tr className="esttr">
                    <td>
                      <b>
                        Total BBL Holding:
                      </b>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="holdingLoad"
                        className="step2"
                        id="holdingLoad"
                        value={holdingLoad}
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        Hold Temp  (°F)
                      </b>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="holdTemp"
                        id="holdTemp"
                        value={holdTemp}
                        placeholder="33"
                        onChange={(e) => setHoldTemp(e.target.value)}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        Ambient Temp (°F)
                      </b>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="ambientTemp"
                        id="ambientTemp"
                        value={ambientTemp}
                        placeholder="90"
                        onChange={(e) => setAmbientTemp(e.target.value)}
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </fieldset>
            <fieldset>
              <legend>Questions</legend>
              <div>
                <table className="form-style-1">
                  <tr>
                    <td>
                      <b>Are you using a Cold Liquor Tank?</b>
                      <select
                        id="coldliqtank"
                        name="coldliqtank"
                        onChange={(e) => setColdLiqTank(e.target.value)}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {coldLiqTank === 'Yes' && (
                        <div id="coldliqtankq">
                          <table className="form-style-3">
                          <tr>
                              <td>
                                <b>Temp to Cool To (°F)</b>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="cltCoolTemp"
                                  value={cltCoolTemp}
                                  onChange={(e) => setCltCoolTemp(e.target.value)}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <b>BBL of Cold Liquor</b>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="cltSize"
                                  placeholder="Enter BBL"
                                  value={cltSize}
                                  onChange={(e) => setCltSize(e.target.value)}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <b>Water Supply Temp (°F)</b>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="cltTemp"
                                  value={cltTemp}
                                  onChange={(e) => setCltTemp(e.target.value)}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <b>Time to Cool (hrs)</b>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="coolTime"
                                  value={cltTime}
                                  onChange={(e) => setCltTime(e.target.value)}
                                />
                              </td>
                            </tr>
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
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>Do you use glycol for your Wort Cooling?</b>
                      <select
                        id="wortcool"
                        name="wortcool"
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
                                        name="batches"
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
                                        name="wortBbl"
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
                                      <select name="wortFlowTime">
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
                                      name="knockoutTemp"
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
                        name="walkincool"
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
                                      name="walkInRoomTemp"
                                      value={walkInRoomTemp}
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
                                      name="walkInGlycolTemp"
                                      value={walkInGlycolTemp}
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
                                      name="walkinCoolerL"
                                      placeholder="Length"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td><b>Width</b></td>
                                  <td>
                                    <input
                                      type="text"
                                      name="walkinCoolerW"
                                      placeholder="Width"
                                    />
                                  </td>
                                </tr>
                                <tr>
                                  <td><b>Height</b></td>
                                  <td>
                                    <input
                                      type="text"
                                      name="walkinCoolerH"
                                      placeholder="Height"
                                    />
                                  </td>
                                </tr>
                              </td>
                            </tr>
                          </table>
                        </div>
                      )}
                  </tr>
                </table>
              </div>
            </fieldset>
          </form>


          <form>
            <fieldset>
              <b>Cellar Cooling Requirement</b>
            <input
              type="text"
              name="knockoutTemp"
              value={knockoutTemp}
              onChange={(e) => setKnockoutTemp(e.target.value)}
            />
            <b>Cold Liquor Cooling Required</b>
            <input
              type="text"
              name="knockoutTemp"
              value={knockoutTemp}
              onChange={(e) => setKnockoutTemp(e.target.value)}
            />
            <b>Walk-In Cooler Requirement</b>
            <input
              type="text"
              name="knockoutTemp"
              value={knockoutTemp}
              onChange={(e) => setKnockoutTemp(e.target.value)}
            />
            <b>2 Stage Wort Cooler Requirement</b>
            <input
              type="text"
              name="knockoutTemp"
              value={knockoutTemp}
              onChange={(e) => setKnockoutTemp(e.target.value)}
            />
            <b>Total Cooling Requirement</b>
            <input
              type="text"
              name="knockoutTemp"
              value={knockoutTemp}
              onChange={(e) => setKnockoutTemp(e.target.value)}
            />
            <b>Recommended Chiller</b>
            <input
              type="text"
              name="knockoutTemp"
              value={knockoutTemp}
              onChange={(e) => setKnockoutTemp(e.target.value)}
            />

            </fieldset>                
          </form>



        </div>
      </section>
    </div>
  );
}
export default CalculatorForm;
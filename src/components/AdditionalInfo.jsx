import axios from "axios";
import { useEffect, useState } from "react";

const AdditionalInfo = ({ onNext, onPrev, name, busName, location, email, phone, cltBtuHour, setCltBtuHour, walkInTotal, setWalkInTotal, wortTotal, setWortTotal, totalCool, setTotalCool, totalTanks, cellarTotal, setRecommendedChiller, setLinkUrl }) => {
    const handleNext = () => {
        onNext();
        //sendMail();
        console.log(totalCool)

    };
    const handlePrev = () => {
        onPrev();
    };

        /**const sendMail = () => {
            event.preventDefault();
            axios
            .get("https://brewcalc.prochiller.com:4000",{
            params: {
                name,
                busName,
                location,
                email,
                phone
            }
            })
            .then((response) => {
            if(response.status === 200){
                console.log("success");
            }
            })
            .catch((error) => {
            console.log("fail", error)
            })
        }
        **/

    //Cold Liquor Tank State
    const [coldLiqTank, setColdLiqTank] = useState('No');
    const [cltCoolTemp, setCltCoolTemp] = useState(40);
    const [cltSize, setCltSize] = useState('');
    const [cltWaterTemp, setCltWaterTemp] = useState(70);
    const [cltTime, setCltTime] = useState(12);
    //CLT Functionality
    
    useEffect(() => {
        liquorLoad();
        }, );
    
        //Cold Liquor Tank
        const liquorLoad = () => {
        let load = (cltSize * 31) * (9) * (.9)
        //Temp Difference
        let tempDif =  cltWaterTemp - cltCoolTemp;
        //Load * Temp Dif / Pulldown Time
        setCltBtuHour(Math.round((load * tempDif)/(cltTime)*1.15*1.3)); 
        }
    


    //Walk-In State
    const [walkInCool, setWalkInCool] = useState('No');
    const [walkInRoomTemp, setWalkInRoomTemp] = useState(38);
    const [walkInGlycolTemp, setWalkInGlycolTemp] = useState(28);
    const [walkInLength, setWalkInLength] = useState('');
    const [walkInWidth, setWalkInWidth] = useState('');
    const [walkInHeight, setWalkInHeight] = useState('');
    //Walk-In Functionality
    useEffect(() => {
        walkInCalc();
    }, );
      
    //WalkIn Cooler
    const walkInCalc = () => { 
        setWalkInTotal(Math.round(((walkInLength*walkInWidth)+(walkInWidth*walkInHeight)+(walkInLength*walkInHeight))*2*14*(1.15*1.3)));
    };
    
    //Wort Cooling State
    const [wortWaterSupply, setWortWaterSupply] = useState(70);
    const [wortCool, setWortCool] = useState('No');
    const [wortBbl, setWortBbl] = useState('');
    const [transferTime, setTransferTime] = useState('30')
    const [knockoutTemp, setKnockoutTemp] = useState(68);

    //Wort Functionality
    useEffect(() => {
        wortCalc();
    }, );
      
    //Wort Cooling
    const wortCalc = () => {
        let wortTempDif =  (wortWaterSupply + 10) - knockoutTemp;
        let wortNumber = ((wortBbl * 31) / transferTime) * (wortTempDif * 500);
        setWortTotal(Math.round(wortNumber * 1.15*1.3));
    }
    

    const linkUrls = {
        "3/4 HP Chill & Flow": "https://prochiller.com/product/3-4hp-chill-flow-model-number-pe1008b1r805-a-v",
        "2 HP Chilstar": "https://prochiller.com/product/chilstar-series-2hp/",
        "3 HP Chilstar": "https://prochiller.com/product/chilstar-series-3hp/",
        "5 HP Chilstar": "https://prochiller.com/product/chilstar-series-5hp/",
        "9 HP Chilstar": "https://prochiller.com/product/chilstar-series-9hp/",
        "Contact Regional Sales Rep": "https://prochiller.com/sales/"
    };
    const chillerData = {
        "": 0,
        "3/4 HP Chill & Flow": 5090,
        "2 HP Chilstar": 14600,
        "3 HP Chilstar": 22500,
        "5 HP Chilstar": 30700,
        "9 HP Chilstar": 59220
    };
    useEffect(() => {
        totalCoolCalc();
    }, );

    function updateRecommendedChiller() {
        let qtyValuesTotal = totalTanks;
        let recommendedChiller = totalCool > 59220 || qtyValuesTotal >= 8? "Contact Regional Sales Rep" : "";
        // If totalCool is not larger than 59220, find the recommended chiller
        if (recommendedChiller === "") {
            for (const [chiller, coolValue] of Object.entries(chillerData)) {
                if (totalCool <= coolValue) {
                    recommendedChiller = chiller;
                    break;
                }
            }
        }
        // Update state or perform any other actions with recommendedChiller value
        setRecommendedChiller(recommendedChiller);
        
        //Set URL based on recommendedChiller
        setLinkUrl(linkUrls[recommendedChiller]);
        }
        const totalCoolCalc = () => {
            setTotalCool(cellarTotal+ cltBtuHour + walkInTotal + wortTotal);
            updateRecommendedChiller();
    }
    
      


    return (
        <div>
            {/*  Bottom Questions & Logo Section  */}    
            <div className="flex text-xs mt-5">
                
              {/*  Questions Section  */}   
              <div className="flex flex-nowrap">

                {/*  Cold Liquor Tank   */}          
                <div className="">
                  <div>
                    <b className="text-lg pt-1.5 pr-2">Are you using a Cold Liquor Tank?</b>
                      <select
                        className="h-7"
                        id="coldliqtank"
                        onChange={(e) => setColdLiqTank(e.target.value)}
                    >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                  </div> 
                  {coldLiqTank === 'Yes' && (
                    <div className="whiteBackground flex flex-row ml-20 mr-20 pb-1 pt-1 rounded-2xl shadow-lg border-solid border-gray-150 border-2">
                      <div className="flex-row">
                        <div>
                          <b>Temp To Cool To (°F)</b>
                          <input
                            type="text"
                            value={cltCoolTemp}
                            onChange={(e) => setCltCoolTemp(e.target.value)}
                          />
                        </div>
                        <div>
                          <b>BBL of Cold Liquor</b>
                          <input
                            type="text"
                            placeholder="Enter BBL"
                            value={cltSize}
                            onChange={(e) => setCltSize(e.target.value)}
                          />
                        </div>
                      </div> 
                      <div className="flex-row">
                        <div>
                          <b>Water Supply Temp (°F)</b>
                          <input
                            type="text"
                            value={cltWaterTemp}
                            onChange={(e) => setCltWaterTemp(e.target.value)}
                          />
                        </div>
                        <div>
                          <b>Time To Cool (Hours)</b>
                          <input
                            type="text"
                            value={cltTime}
                            onChange={(e) => setCltTime(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>


                {/*  Wort Cooling  */}      
                <div className="mt-2">         
                  <div className="">
                      <b className="text-lg pr-2">Do you use glycol for your Wort Cooling?</b>
                      <select
                        className="h-7"
                        id="wortcool"
                        onChange={(e) => setWortCool(e.target.value)}
                        >
                        <option value="No" >No</option>
                        <option value="Yes">Yes</option>
                      </select>
                  </div>
                  {wortCool === 'Yes' && (
                    <div className="whiteBackground flex flex-row ml-20 mr-20 pb-1 pt-1 rounded-2xl shadow-lg border-solid border-gray-150 border-2">
                      <div className="flex-row">  
                        <div>
                          <b>Water Supply Temp (°F)</b>
                            <input
                              type="text"
                              value={wortWaterSupply}
                              onChange={(e) => setWortWaterSupply(e.target.value)}
                            />
                        </div>
                        <div>
                            <b>BBL of Wort Cooling</b>
                              <input
                                type="text"
                                placeholder="BBL"
                                value={wortBbl}
                                onChange={(e) => setWortBbl(e.target.value)}
                              />
                        </div>
                      </div> 
                      <div className="flex-row">
                        <div>
                          <b>Transfer Time of Wort</b>
                            <select
                              className="w-40"
                              onChange={(e) => setTransferTime(e.target.value)}
                            >
                              <option value={30}>30 Min</option>
                              <option value={45}>45 Min</option>
                              <option value={60}>60 Min</option>
                            </select>
                        </div>
                        <div>
                          <b>Knockout Temp (°F)</b>
                          <input
                            type="text"
                            value={knockoutTemp}
                            onChange={(e) => setKnockoutTemp(e.target.value)}
                          />
                        </div> 
                      </div>
                    </div>
                  )}
                </div>   
                  {/*  Walk-In Cooler   */}      
                <div className="mt-2">
                  <div >
                    <b className="text-lg pr-2">Do you have a Walk-In Cooler?</b>
                    <select
                      className="h-7"
                      id="walkincool"
                      onChange={(e) => setWalkInCool(e.target.value)}
                    >
                      <option value="No" >No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </div>
                    {walkInCool === 'Yes' && (
                      <div className="whiteBackground flex flex-row ml-20 mr-20 pb-1 pt-1 rounded-2xl shadow-lg border-solid border-gray-150 border-2">
                        <div className="flex-row">
                          <div>
                            <b>Room Temperature (°F)</b>
                            <input
                              type="text"
                              value={walkInRoomTemp}
                              onChange={(e) => setWalkInRoomTemp(e.target.value)}
                            />
                          </div>
                          <div>
                            <b>Glycol Temperature (°F)</b>
                            <input
                              type="text"
                              value={walkInGlycolTemp}
                              onChange={(e) => setWalkInGlycolTemp(e.target.value)}
                            />
                          </div>
                        </div>  
                        <div className="flex-row">
                          <div>
                            <b>Walk-In Cooler Length</b>
                            <input
                              type="text"
                              placeholder="Length (Feet)"
                              value={walkInLength}
                              onChange={(e) => setWalkInLength(e.target.value)}
                            />
                          </div>
                          <div>
                            <b>Walk-In Cooler Width</b>
                            <input
                              type="text"
                              placeholder="Width (Feet)"
                                value={walkInWidth}
                              onChange={(e) => setWalkInWidth(e.target.value)}
                            />
                          </div>
                          <div>
                            <b>Walk-In Cooler Height</b>
                            <input
                              type="text"
                              placeholder="Height (Feet)"
                              value={walkInHeight}
                              onChange={(e) => setWalkInHeight(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
           <button onClick={handlePrev} className='basis-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Prev Step</button>
            <button onClick={handleNext} className='basis-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Submit</button>
            {/*Submit Button Tied into handleNext <button  onClick={sendEmail} className='basis-1 submit-button w-24 rounded-full place-self-center'>Submit</button> **/}
        </div>



    )
}
export default AdditionalInfo;
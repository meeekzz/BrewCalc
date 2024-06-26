import { useState } from "react";
import ContactModal from "./ContactModal";


    const Totals = ({ onReset, cellarTotal, cltBtuHour, wortTotal, walkInTotal, totalCool, linkUrl, recommendedChiller }) => {
        const handleReset = () => {
            onReset();
        };

    //Modal State for Functions Below
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Function to handle modal open
    const openModal = () => {
            setIsModalOpen(true);
        };
    // Function to handle modal close
    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div>
            <div className="basis-2/7 text-xs self-center mt-10"> 
                <div className="indent rounded-2xl p-1 ml-1">
                    <div className="">
                        <div className="">
                            <b>Cellar Cooling</b>
                        </div>
                            <input
                            type="text"
                            className="w-20 text-center"
                            value={cellarTotal}
                            readOnly
                            />
                    </div>
                    <div className="mt-2">
                        <div className="">
                        <b>CLT Cooling</b>
                        </div>
                        <input
                        type="text"
                        className="w-20 text-center"
                        value={cltBtuHour}
                        readOnly
                        
                        />
                    </div>
                    <div className="mt-2">
                        <div className="">
                        <b>Wort Cooling</b>
                        </div>
                        <input
                        type="text"
                        className="w-20 text-center"
                        value={wortTotal}
                        readOnly
                        />
                    </div>
                    <div className="mt-2">
                        <div className="">
                        <b>Walk-In Cooling</b>
                        </div>
                        <input
                        type="text"
                        className="w-20 text-center"
                        value={walkInTotal}
                        readOnly
                        />
                    </div>
                </div>
                <div className="whiteBackground shadow-lg pb-1 border-solid border-gray-150 border-2 rounded-2xl mt-1">
                    <div className="text-sm mt-2">
                        <b>Total Cooling (BTU/Hr)</b>
                    </div>
                    <input
                        type="text"
                        className="totalCool text-center "
                        value={totalCool}
                        readOnly
                    />
                </div>
            </div>    
            <div className=" mt-2 basis-4/6 ">
                <div className="">
                    <div className="text-base">
                        <b>Recommended Chiller</b>
                    </div>
                    <div>    
                        <a
                            href={linkUrl} 
                            target="_blank"
                            className=" text-center underline text-base"
                            rel="noopener noreferrer"
                        >
                            {recommendedChiller} 
                        </a>
                    </div>
                </div>
                <div className="basis-2/6 justify-self-end self-center mt-5">
                {/* Button to open the modal */}
                <button className="bg-[#0a275f] text-white rounded-xl p-2" type="button"onClick={openModal}>Sales Contact Information</button>
                {/* Render the Modal component */}
                <ContactModal isOpen={isModalOpen} onClose={closeModal} />
              </div>
            </div>
            <br/>
            <button onClick={handleReset} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 place-self-center'>Reset</button>
        </div>
    )
}
export default Totals;
import './ContactModal.css';

function ContactModal({ isOpen, onClose }) {
  // Dummy contact information
  const northWestContactInfo = {
    name: 'Jeremy Vrieling',
    email: 'jeremyv@prorefrigeration.com',
    phone: '(360) 325-1235'
  };
  const southWestContactInfo = {
    name: 'Jim Weatherwax',
    email: 'jimw@prorefrigeration.com',
    phone: '(970) 388-1058'
  };
  const eastContactInfo = {
    name: 'Wesley Thompson',
    email: 'wesleyt@prorefrigeration.com',
    phone: '(336) 225-5742)'
  };

  return (
    <div className={`modal ${isOpen ? 'is-open' : ''}`}>
    <div className="modal-overlay" onClick={onClose}></div>
    <div className="modal-content">
      <div className="modal-header justify-end">
        <button type="button" className="close-button" onClick={onClose}>X</button>
      </div>
      <h1 className="mb-4">Regional Sales Map</h1>
      <img className="mx-auto" src="https://prochiller.com/wp-content/uploads/2024/03/North-America-Map-Pro-Sales-Regions_updated-11-2023-scaled.jpg" alt="" />
      <div className="flex mx-auto space-x-4 mt-10 mb-8">
        <div className="modal-body background1 mx-auto text-base p-4 rounded-lg">
          <p>{northWestContactInfo.name}</p>
          <p><a className="text-white hover:text-black " href={`mailto:${northWestContactInfo.email}`}>{northWestContactInfo.email}</a></p>
          <p>{northWestContactInfo.phone}</p>
          <p>{northWestContactInfo.address}</p>
        </div>
        <div className="modal-body background2 mx-auto text-base p-4 rounded-lg">
          <p>{southWestContactInfo.name}</p>
          <p><a className="text-white hover:text-black" href={`mailto:${southWestContactInfo.email}`}>{southWestContactInfo.email}</a></p>
          <p>{southWestContactInfo.phone}</p>
          <p>{southWestContactInfo.address}</p>
        </div>
        <div className="modal-body background3 mx-auto text-base p-4 rounded-lg">
          <p>{eastContactInfo.name}</p>
          <p><a className="text-white hover:text-black" href={`mailto:${eastContactInfo.email}`}>{eastContactInfo.email}</a></p>
          <p>{eastContactInfo.phone}</p>
          <p>{eastContactInfo.address}</p>
        </div>
      </div>
    </div>
  </div>
  );
}

export default ContactModal;
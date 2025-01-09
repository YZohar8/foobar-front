import { Link } from "react-router-dom";

function AlertRegister({ header, text, textbtn, path }) {

    const closeModal = () => {
        const myModal = window.bootstrap.Modal.getInstance(document.getElementById('registerSuccessModal'));
        if (myModal) {
          myModal.hide();
        }
      };


    return (
        <div className="modal fade" id="registerSuccessModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content" style={{minHeight:'200px'}}>
                    <div className="modal-header">
                        <h5 className="modal-title">{header}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>{text}</p>
                    </div>
                    <div className="modal-footer">
                        <Link to={path} type="button" className="btn btn-primary" onClick={closeModal}>{textbtn}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlertRegister;
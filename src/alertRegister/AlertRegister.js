import { Link } from "react-router-dom";

function AlertRegister({ header, text, textbtn, path }) {

    const closeModal = () => {
        const myModal = window.bootstrap.Modal.getInstance(document.getElementById('registerSuccessModal'));
        if (myModal) {
          myModal.hide();
        }
      };


    return (
        <div class="modal fade" id="registerSuccessModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">{header}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>{text}</p>
                    </div>
                    <div class="modal-footer">
                        <Link to={path} type="button" class="btn btn-primary" onClick={closeModal}>{textbtn}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlertRegister;
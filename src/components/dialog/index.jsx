import React from 'react'
import PropTypes from 'prop-types';

const Dialog = ({
    title,
    description,
    actionText,
    action,
    onClose
}) => {
    return (
        <div className='position-absolute w-100 h-100 z-10'>
            <div
                className='position-fixed w-100 h-100 bg-dark opacity-50'
                onClick={ onClose }
            />
            <div className="modal-dialog px-auto pt-4 z-10" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{ title }</h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        { description }
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={ onClose }
                        >
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={ action }
                        >
                            { actionText }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Dialog.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    actionText: PropTypes.string,
    action: PropTypes.func,
    onClose: PropTypes.func,
};

export default Dialog
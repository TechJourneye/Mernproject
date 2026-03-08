export default function FlashMSG({ msg, onClose }) {

    if (!msg) return null;

    return (
        <div className="alert alert-success alert-dismissible fade show col-6 offset-3 mt-3" role="alert">
            {msg}
            <button
                type="button"
                className="btn-close"
                onClick={onClose}
            ></button>
        </div>
    );
}
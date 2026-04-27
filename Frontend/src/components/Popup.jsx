export default function Popup({ open, title, message, onClose, children, actions }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-card__head">
          <div>
            <h2 className="modal-card__title">{title}</h2>
            {message ? <p className="modal-card__copy">{message}</p> : null}
          </div>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="Close popup">
            x
          </button>
        </div>

        {children}
        {actions ? <div className="modal-card__actions">{actions}</div> : null}
      </div>
    </div>
  );
}

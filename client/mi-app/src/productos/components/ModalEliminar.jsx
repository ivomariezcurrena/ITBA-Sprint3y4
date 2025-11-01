import "./ModalEliminar.css";

export default function ModalEliminar({ abierto, onClose, onConfirm, producto }) {
  if (!abierto) return null;

  return (
    <div className="modal-eliminar-backdrop">
      <div className="modal-eliminar">
        <h2>¿Eliminar producto?</h2>
        <p>
          ¿Estás seguro que deseas eliminar <b>{producto?.nombre}</b>?
        </p>
        <div className="modal-eliminar-botones">
          <button className="cancelar" onClick={onClose}>
            Cancelar
          </button>
          <button className="eliminar" onClick={() => onConfirm(producto?._id)}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
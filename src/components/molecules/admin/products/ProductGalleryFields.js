import { RiCloseLine, RiAddLine } from "react-icons/ri";
import { previewImage } from "src/utils/previewImage";

export default function ProductGalleryFields({
  images = [""],
  onAdd,
  onUpdate,
  onRemove,
}) {
  return (
    <div className="md:col-span-2 space-y-2">
      <label className="text-xs font-bold uppercase tracking-widest text-neutral-500 block">
        Product Gallery Images
      </label>
      <div className="space-y-3">
        {images.map((imgUrl, imgIdx) => (
          <div
            key={imgIdx}
            className="flex gap-2 items-center animate-in fade-in slide-in-from-top-1 duration-200"
          >
            <div
              onClick={() => imgUrl && previewImage(imgUrl)}
              className={`w-12 h-12 rounded-xl border border-neutral-200 bg-neutral-100 overflow-hidden shadow-inner flex items-center justify-center shrink-0 ${
                imgUrl ? "cursor-zoom-in hover:scale-105 transition-all duration-300" : ""
              }`}
            >
              {imgUrl ? (
                <img
                  src={imgUrl}
                  alt={`Preview ${imgIdx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <span className="text-[10px] text-neutral-400 font-bold uppercase">
                  No Pic
                </span>
              )}
            </div>
            <input
              type="text"
              value={imgUrl}
              onChange={(e) => onUpdate(imgIdx, e.target.value)}
              placeholder="Paste Image URL here..."
              className="flex-1 rounded-xl h-11 border border-neutral-300 bg-white px-4 text-sm focus:ring-2 focus:ring-primary/45 focus:border-primary focus:outline-none"
            />
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(imgIdx)}
                className="p-3 rounded-xl border border-danger/20 bg-error-bg text-danger hover:bg-danger hover:text-white transition duration-300 cursor-pointer shadow-sm shrink-0"
              >
                <RiCloseLine className="text-lg" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-dark text-white rounded-xl py-2 px-4 text-xs font-bold shadow-md shadow-primary/20 transition cursor-pointer"
        >
          <RiAddLine className="text-sm" /> Add Image URL
        </button>
      </div>
    </div>
  );
}

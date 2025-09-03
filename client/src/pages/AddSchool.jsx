import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_BASE_URL;


export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key !== "image") formData.append(key, data[key]);
      });
      formData.append("image", data.image[0]);

      const res = await fetch(`${BASE_URL}/api/schools/add`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "School added successfully!");
        reset();
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    }
  };



  const imgFile = watch("image")?.[0];

  return (
    <section className="container py-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Add School</h2>

      <form className="grid md:grid-cols-2 gap-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-control">
          <label>School Name *</label>
          <input className="input" {...register("name", { required: "Name is required", minLength: { value: 2, message: "Too short" } })} />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-control">
          <label>Email *</label>
          <input
            className="input"
            type="email"
            {...register("email_id", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
            })}
          />
          {errors.email_id && <p className="error">{errors.email_id.message}</p>}
        </div>

        <div className="form-control md:col-span-2">
          <label>Address *</label>
          <input className="input" {...register("address", { required: "Address is required" })} />
          {errors.address && <p className="error">{errors.address.message}</p>}
        </div>

        <div className="form-control">
          <label>City *</label>
          <input className="input" {...register("city", { required: "City is required" })} />
          {errors.city && <p className="error">{errors.city.message}</p>}
        </div>

        <div className="form-control">
          <label>State *</label>
          <input className="input" {...register("state", { required: "State is required" })} />
          {errors.state && <p className="error">{errors.state.message}</p>}
        </div>

        <div className="form-control">
          <label>Contact *</label>
          <input
            className="input"
            inputMode="numeric"
            maxLength={15}
            {...register("contact", {
              required: "Contact is required",
              pattern: { value: /^[0-9+\-\s()]{7,15}$/, message: "Digits and + - () allowed" },
            })}
          />
          {errors.contact && <p className="error">{errors.contact.message}</p>}
        </div>

        <div className="form-control ">
          <label>School Image (PNG/JPG, ≤ 2MB) *</label>
          <input
            className="input"
            type="file"
            accept="image/png, image/jpeg"
            {...register("image", {
              required: "Image is required",
              validate: {
                size: (files) => (files?.[0]?.size ?? 0) <= 2_000_000 || "Max 2MB",
                type: (files) => ["image/png", "image/jpeg"].includes(files?.[0]?.type) || "PNG/JPG only",
              },
            })}
          />
          {errors.image && <p className="error">{errors.image.message}</p>}
        </div>

       

        <div className="md:col-span-2">
          <button className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save School"}
          </button>
        </div>
      </form>
    </section>
  );
}

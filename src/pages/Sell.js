import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { storage, db, auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Container, Col } from 'react-bootstrap';

const categories = ["Writing", "Programming", "Public Speaking", "Music", "Dancing", "Arts"];
const locations = ["Alangilan", "Borbon", "Lipa", "Lemery", "Mabini", "Rosario", "Balayan", "ARASOF-Nasugbu", "JPLPC-Malvar", "San Juan", "Lobo"];

const Sell = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    images: [],
    title: "",
    category: "",
    skill: "",
    location: "",
    contact: "",
    description: "",
    error: {
      title: "",
      category: "",
      skill: "",
      location: "",
      contact: "",
      description: "",
      images: "",
    },
    loading: false,
  });

  const {
    images,
    title,
    category,
    skill,
    location,
    contact,
    description,
    error,
    loading,
  } = values;

  const [imageAlert, setImageAlert] = useState("");

  const handleCloseImageAlert = () => {
    setImageAlert("");
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value, error: { ...values.error, [e.target.name]: "" } });
  };

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;

    if (selectedImages.length > 0) {
      setValues({ ...values, images: selectedImages, error: { ...values.error, images: "" } });
      setImageAlert("Image/s uploaded successfully!");
    } else {
      setValues({ ...values, error: { ...values.error, images: "Please upload at least one image" }, images: [] });
      setImageAlert("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submitting
    if (!isFormValid()) {
      return;
    }

    setValues({ ...values, loading: true });

    try {
      let imgs = [];
      // loop through images
      if (images.length) {
        for (let image of images) {
          const imgRef = ref(storage, `ads/${Date.now()} - ${image.name}`);
          const result = await uploadBytes(imgRef, image);
          const fileUrl = await getDownloadURL(
            ref(storage, result.ref.fullPath)
          );

          imgs.push({ url: fileUrl, path: result.ref.fullPath });
        }
      }
      // add data into firestore
      const result = await addDoc(collection(db, "ads"), {
        images: imgs,
        title,
        category,
        skill,
        location,
        contact,
        description,
        isSold: false,
        publishedAt: Timestamp.fromDate(new Date()),
        postedBy: auth.currentUser.uid,
      });

      await setDoc(
        doc(db, "ads", result.id),
        {
          adId: result.id,
        },
        {
          merge: true,
        }
      );

      await setDoc(doc(db, "favorites", result.id), {
        users: [],
      });

      setValues({
        images: [],
        title: "",
        category: "",
        skill: "",
        location: "",
        contact: "",
        description: "",
        loading: false,
      });
      navigate("/");
    } catch (error) {
      setValues({ ...values, error: { ...values.error, submit: error.message }, loading: false });
    }
  };

  const isFormValid = () => {
    const newErrors = {
      title: "",
      category: "",
      skill: "",
      location: "",
      contact: "",
      description: "",
      images: "",
    };

    // Check if all required fields are filled in
    if (!title) newErrors.title = "Title is required.";
    if (!category) newErrors.category = "Category is required.";
    if (!skill) newErrors.skill = "Skill is required.";
    if (!location) newErrors.location = "Location is required.";
    if (!contact) newErrors.contact = "Contact is required.";
    if (!description) newErrors.description = "Description is required.";
    if (images.length === 0) newErrors.images = "Please upload at least one image.";

    setValues({ ...values, error: newErrors });

    return Object.values(newErrors).every((val) => val === "");
  };

  return (
    <Container fluid className='p-5 d-flex align-items-center justify-content-center'>
      <Col md='5' className='position-relative'>
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
        <form className="form shadow rounded p-3 mt-5 bg-glass" onSubmit={handleSubmit}>
          <div className="text-center mb-3">
            <img
              src="../images/logo.png"
              alt="logo"
              width="auto"
              height="50px"
              className="mx-auto d-block"
            />
          </div>
          <h3 className="text-center mb-3 icon-color-3">InterList</h3>
          <p className="text-center mb-3 icon-color"> Create a Skill you want to Share</p>
          <div className="mb-3 text-center">
            <label htmlFor="image">
              <div className="btn btn-secondary btn-sm">
                <FaCloudUploadAlt size={25} /> Upload Multiple Images
              </div>
            </label>
            <input
              type="file"
              id="image"
              style={{ display: "none" }}
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>

          {imageAlert && (
            <div className="mb-3 text-center">
              <div
                className="alert alert-success"
                onClick={handleCloseImageAlert}
                role="alert"
              >
                {imageAlert}
              </div>
            </div>
          )}

          {error.images && (
            <div className="mb-3 text-center">
              <p className="text-center text-danger">{error.images}</p>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label icon-color-3">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={title}
              onChange={handleChange}
            />
            {error.title && (
              <p className="text-danger">{error.title}</p>
              )}
          </div>
          <div className="mb-3">
            <select name="category" className="form-select icon-color-3" onChange={handleChange}>
              <option value="">Select Skill Expertise</option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
            {error.category && (
              <p className="text-danger">{error.category}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label icon-color-3"> Skill You Want to Learn</label>
            <input
              type="text"
              className="form-control"
              name="skill"
              value={skill}
              onChange={handleChange}
            />
            {error.skill && (
              <p className="text-danger">{error.skill}</p>
            )}
          </div>
          <div className="mb-3">
            <select name="location" className="form-select icon-color-3" onChange={handleChange}>
              <option value="">Select Location</option>
              {locations.map((location) => (
                <option value={location} key={location}>
                  {location}
                </option>
              ))}
            </select>
            {error.location && (
              <p className="text-danger">{error.location}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label icon-color-3">Contact</label>
            <input
              type="text"
              className="form-control"
              name="contact"
              value={contact}
              onChange={handleChange}
            />
            {error.contact && (
              <p className="text-danger">{error.contact}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label icon-color-3">Description</label>
            <textarea
              name="description"
              cols="30"
              rows="3"
              className="form-control"
              value={description}
              onChange={handleChange}
            ></textarea>
            {error.description && (
              <p className="text-danger">{error.description}</p>
            )}
          </div>

          {error.submit && (
            <div className="mb-3 text-center">
              <p className="text-center text-danger">{error.submit}</p>
            </div>
          )}

          <div className="mb-3 text-center">
            <button className="btn btn-secondary btn-sm w-50" disabled={loading}>
              Create
            </button>
          </div>
        </form>
      </Col>
    </Container>
  );
};

export default Sell;

           

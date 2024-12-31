import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ShowData() {

    const navigate = useNavigate();
    const [items, setItems] = useState(() => {
        const storedData = localStorage.getItem("data");
        return storedData ? JSON.parse(storedData) : [];
    });

    const [edit, setEdit] = useState({
        name: "",
        email: ""
    });
    const [editIndex, setEditIndex] = useState(null);
    const [editForm, setEditForm] = useState(false);

    const handleDelete = (i) => {
        const updatedData = items.filter((_, index) => index !== i);
        setItems(updatedData);
        localStorage.setItem("data", JSON.stringify(updatedData));
    };

    const handleForm = (e) => {
        e.preventDefault();

        const updatedItems = [...items];
        if (editForm) {
            updatedItems[editIndex] = edit;
        } else {
            updatedItems.push(edit);
        }

        setItems(updatedItems);
        localStorage.setItem("data", JSON.stringify(updatedItems));

        setEdit({
            name: "",
            email: ""
        });
        setEditForm(false);
        setEditIndex(null);
    };

    const handleEdit = (i) => {
        setEditIndex(i);
        setEdit(items[i]);
        setEditForm(true);
    };

    const addmore = () => {
        navigate("/login")
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Employee Data</h1>

            {items.length === 0 ? (
                <div className="alert alert-warning text-center">
                    No employee data found.
                </div>
            ) : (
                <div className="card shadow">
                    <div className="card-body">
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Sr No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((ele, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.email}</td>
                                        <td>
                                            <button className="btn btn-warning btn-sm" onClick={() => handleEdit(i)}>Edit</button>
                                            <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(i)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {editForm && (
                <div className="card mt-4 shadow">
                    <div className="card-header bg-warning text-white text-center">
                        <h4>Edit Employee</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleForm}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Employee Name"
                                    value={edit.name}
                                    onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    required
                                    placeholder="Enter Employee Email"
                                    value={edit.email}
                                    onChange={(e) => setEdit({ ...edit, email: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">
                                Update Employee
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-4 text-center">
                <button className="btn btn-primary" onClick={addmore}>Add New Employee</button>
            </div>
        </div>
    );
}

export default ShowData;

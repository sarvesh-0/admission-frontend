import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Report() {
    const [admissionForms, setAdmissionForms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdmissionForms = async () => {
            try {
                const response = await axios.get('https://admissionportal-050o.onrender.com/api/admissions/all');
                setAdmissionForms(response.data);
            } catch (err) {
                setError('Failed to fetch data');
                console.error("Error fetching admission forms:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmissionForms();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this form?')) {
            try {
                await axios.delete(`https://admissionportal-050o.onrender.com/api/admissions/delete/${id}`);
                setAdmissionForms(admissionForms.filter(form => form.admissionId !== id));
            } catch (error) {
                console.error("Error deleting form:", error);
                alert('Failed to delete the form.');
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleView = (id) => {
        navigate(`/view/${id}`);
    };
    const columns = [
        {
            name: 'Admission ID',
            selector: row => row.admissionId,
            sortable: true,
        },
        {
            name: 'Full Name',
            selector: row => row.fullName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Mobile',
            selector: row => row.mobile,
            sortable: true,
        },
        {
            name: 'DOB',
            selector: row => row.dob,
            sortable: true,
        },
        {
            name: 'Gender',
            selector: row => row.gender,
            sortable: true,
        },
        {
            name: 'District',
            selector: row => row.district,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <>
                    <Button variant="info" size="sm" className="me-2" onClick={() => handleView(row.admissionId)} title="View">
                        <FontAwesomeIcon icon={faEye} /> {/* View Icon */}
                    </Button>
                    <Button variant="primary" size="sm" className="me-2" onClick={() => handleEdit(row.admissionId)} title="Edit">
                        <FontAwesomeIcon icon={faEdit} /> {/* Edit Icon */}
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(row.admissionId)} title="Delete">
                        <FontAwesomeIcon icon={faTrash} /> {/* Delete Icon */}
                    </Button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const filteredItems = admissionForms.filter(
		item => item.fullName && item.fullName.toLowerCase().includes(filterText.toLowerCase()),
	);

    const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Filter By Name"
                    aria-label="Search Input"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                    style={{ marginRight: '8px', padding: '6px' }}
                />
                <Button type="button" onClick={handleClear} variant='secondary' size='sm'>
                 Clear
                </Button>
            </div>

		);
	}, [filterText, resetPaginationToggle]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Container>
            <h2>Admission Report</h2>
            <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                responsive
                striped
                highlightOnHover
                pointerOnHover
            />
        </Container>
    );
}

export default Report;
const EmployeeDetail = () => {
    const { adminid, hrid, empid } = useParams();
    const [userid, setUserid] = useState(adminid || hrid || empid)
    const [employee, setEmployee] = useState({
        name: "",
        lname: "",
        email: "",
        category_id: "",
        role: "",
    });
    const [category, setCategory] = useState([])
    const [currentRole, setCurrentRole] = useState("");
    const [currentDept, setCurrentDepartment] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        setUserid(adminid || hrid || empid);
    }, [adminid, hrid, empid]);

    useEffect(() => {
        axios.get(`https://code-test-nabina-production.up.railway.app/auth/category`)
            .then(result => {
                if (result.data.Status) {
                    setCategory(result.data.Result);
                } else {
                    alert(result.data.Error)
                }
            }).catch(err => console.log(err))

        axios.get(`https://code-test-nabina-production.up.railway.app/auth/employee/` + userid)
            .then(result => {
                setEmployee({
                    ...employee,
                    name: result.data.Result[0].name,
                    lname: result.data.Result[0].lname,
                    email: result.data.Result[0].email,
                    category_id: result.data.Result[0].category_id,
                    role: result.data.Result[0].role,
                })
                const currentRole = result.data.Result[0].role;
                setCurrentRole(currentRole);
                const currentDept = category.find(c => c.id === result.data.Result[0].category_id);
                setCurrentDepartment(currentDept ? currentDept.name : "");
            }).catch(err => console.log(err))
    }, [userid, category])


    return (
        <div className="d-flex justify-content-center align-items-center mt-3">
            <div className="p-3 rounded w-50 border">
                <h3 className="text-center">Profile</h3>
                <form className="row g-1">
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputName"
                            placeholder="Enter Name"
                            value={employee.name}
                            disabled
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputLName" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="inputLName"
                            value={employee.lname}
                            disabled
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control rounded-0"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            value={employee.email}
                            disabled
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="role" className="form-label">
                            Role
                        </label>
                        <input
                            type="text"
                            className="form-control rounded-0"
                            id="role"
                            value={employee.role}
                            disabled
                        />
                    </div>
                </form>
            </div>
        </div>
    );

};

export default EmployeeDetail;
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Col, Row} from "reactstrap";
import {RSelect} from "../../../components/index.jsx";
import {get as getYear} from "../../../utils/api/master/year.jsx"
import {get as getInstitution} from "../../../utils/api/institution.jsx"

const FormActivity = ({formData, setFormData, ...props}) => {
    const [yearOptions, setYearOptions] = useState([]);
    const [institutionOptions, setInstitutionOptions] = useState([]);
    const [rombelOptions, setRombelOptions] = useState([]);
    const [rombelSelected, setRombelSelected] = useState([]);
    const [programOptions, setProgramOptions] = useState([]);
    const [programSelected, setProgramSelected] = useState([]);
    const [boardingOptions, setBoardingOptions] = useState([]);
    const [boardingSelected, setBoardingSelected] = useState([]);

    const statusOptions = [
        {value: 1, label: "Aktif"},
        {value: 2, label: "Keluar"},
        {value: 3, label: "Alumni"}
    ]

    const {  control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = () => {

    };

    useEffect(() => {
        getYear({type: 'select'}).then((resp) => setYearOptions(resp));
        getInstitution({type: 'select', ladder: 'alias'}).then((resp) => setInstitutionOptions(resp));
    }, [])

    useEffect(() => {
        console.log(formData)
    }, [])

    return (
        <form className="content clearfix" onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-4">
                <Col md="4">
                    <div className="form-group">
                        <label className="form-label" htmlFor="status">Status</label>
                        <div className="form-control-wrap">
                            <RSelect
                                options={statusOptions}
                                value={statusOptions?.find((c) => c.value === formData.status)}
                                onChange={(val) => setFormData({...formData, status: val.value})}
                                placeholder="Pilih Status"
                            />
                            <input type="hidden" id="status" className="form-control"/>
                            {errors.status && <span className="invalid">Kolom tidak boleh kosong.</span>}
                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="form-group">
                        <label className="form-label" htmlFor="yearId">Tahun Pelajaran</label>
                        <div className="form-control-wrap">
                            <RSelect
                                options={yearOptions}
                                value={yearOptions?.find((c) => c.value === formData.yearId)}
                                onChange={(val) => setFormData({...formData, yearId: val.value})}
                                placeholder="Pilih Tahun Pelajaran"
                            />
                            <input type="hidden" id="yearId" className="form-control"/>
                            {errors.yearId && <span className="invalid">Kolom tidak boleh kosong.</span>}
                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="form-group">
                        <label className="form-label" htmlFor="institutionId">Lembaga</label>
                        <div className="form-control-wrap">
                            <RSelect
                                options={institutionOptions}
                                value={institutionOptions?.find((c) => c.value === formData.institutionId)}
                                onChange={(val) => setFormData({...formData, institutionId: val.value})}
                                placeholder="Pilih Lembaga"
                            />
                            <input type="hidden" id="institutionId" className="form-control"/>
                            {errors.institutionId && <span className="invalid">Kolom tidak boleh kosong.</span>}
                        </div>
                    </div>
                </Col>
                <div className="actions clearfix">
                    <ul>
                        <li>
                            <Button color="primary" type="submit">Selesai</Button>
                        </li>
                        <li>
                            <Button color="primary" type="button" onClick={props.prev}>Kembali</Button>
                        </li>
                    </ul>
                </div>
            </Row>
        </form>
    );
};

export default FormActivity;
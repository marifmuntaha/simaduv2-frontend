import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Col, Row} from "reactstrap";
import {RSelect} from "../../components";
import {get as getYear} from "../../utils/api/master/year"
import {store as storeUser, destroy as destroyUser} from "../../utils/api/user"
import {store as storeStudent} from "../../utils/api/student"

const FormActivity = ({formData, setFormData, ...props}) => {
    const [yearOptions, setYearOptions] = useState([]);
    const [institutionOptions, setInstitutionOptions] = useState([]);
    const [institutionSelected, setInstitutionSelected] = useState([]);
    const [rombelOptions, setRombelOptions] = useState([]);
    const [rombelSelected, setRombelSelected] = useState([]);
    const [programOptions, setProgramOptions] = useState([]);
    const [programSelected, setProgramSelected] = useState([]);
    const [boardingOptions, setBoardingOptions] = useState([]);
    const [boardingSelected, setBoardingSelected] = useState([]);

    const {  control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = () => {
        const params = {
            name: formData.name,
            email: formData.email,
            username: formData.nisn,
            password: formData.birthplace,
            phone: formData.phone,
            role: '5'
        }
        storeUser(params).then(resp=>{
            const params = {
                userId: resp.id,
                nisn: formData.nisn,
                nism: formData.nism,
                name: formData.name,
                gender: formData.gender,
                birthplace: formData.birthplace,
                birthdate: formData.birthdate,
                email: formData.email,
                phone: formData.phone,
                yearId: [formData.yearId],
            }
            storeStudent(params).catch(() => {
                destroyUser(resp.id)
            })
        })
    };

    useEffect(() => {
        getYear({type: 'select'}).then((resp) => setYearOptions(resp));
    }, [])

    return (
        <form className="content clearfix" onSubmit={handleSubmit(onSubmit)}>
            <Row className="gy-4">
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
                        <label className="form-label" htmlFor="yearId">Lembaga</label>
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
import React, {useEffect, useState} from "react";
import {Button, Col, Row} from "reactstrap";
import {RSelect} from "../../components";
import DatePicker from "react-datepicker";
import moment from "moment";

const FormPersonal = ({formData, setFormData, methods, ...props}) => {
    const [birthdateSelected, setBirthdateSelected] = useState(new Date());
    const genderOptions = [
        {value: "L", label: "Laki-laki"},
        {value: "P", label: "Perempuan"},
    ]
    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const { register, handleSubmit, formState: { errors } } = methods;
    const submitForm = () => {
        props.next();
    };

    useEffect(() => {

    }, [formData]);
    return (
        <form className="content clearfix" onSubmit={handleSubmit(submitForm)}>
            <Row className="gy-4">
                <Col md="12">
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">
                            Nama Lengkap
                        </label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="name"
                                className="form-control"
                                placeholder="Ex. Achmad Wikramawardhana"
                                {...register('name', { required: true })}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="nisn">NISN</label>
                        <div className="form-control-wrap">
                            <input
                                type="number"
                                id="nisn"
                                className="form-control"
                                placeholder="Ex. 1234567890"
                                {...register('nisn', { required: true })}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.nisn && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="nism">NISM</label>
                        <div className="form-control-wrap">
                            <input
                                type="number"
                                id="nism"
                                className="form-control"
                                {...register('nism', { required: true })}
                                onChange={(e) => onInputChange(e)}
                                placeholder="Ex. 1234567890"
                            />
                            {errors.nism && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="form-group">
                        <label className="form-label" htmlFor="gender">Jenis Kelamin</label>
                        <div className="form-control-wrap">
                            <RSelect
                                id="gender"
                                options={genderOptions}
                                value={genderOptions?.find((e) => e.value === formData.gender)}
                                onChange={(val) => {
                                    setFormData({...formData, gender: val.value})
                                }}
                                placeholder="Pilih Jenis Kelamin"
                            />
                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="form-group">
                        <label className="form-label" htmlFor="birthplace">Tempat Lahir</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="birthplace"
                                className="form-control"
                                placeholder="Ex. Jepara"
                                {...register('birthplace', { required: true })}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.birthplace && <span className="invalid">Kolom tidak boleh kosong.</span>}
                        </div>
                    </div>
                </Col>
                <Col md="4">
                    <div className="form-group">
                        <label className="form-label" htmlFor="birthdate">Tanggal Lahir</label>
                        <div className="form-control-wrap">
                            <DatePicker
                                locale="id"
                                selected={birthdateSelected}
                                onChange={(e) => {
                                    setFormData({...formData, birthdate: moment(e).format('YYYY-MM-DD')});
                                    setBirthdateSelected(e)
                                }}
                                dateFormat={"dd/MM/yyyy"}
                                className="form-control date-picker" />{" "}
                            {errors.birthdate && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="email"
                                className="form-control"
                                placeholder="Ex. wikramawardhana@gmail.com"
                                {...register('email', { required: true })}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.email && <span className="invalid">Kolom tidak boleh kosong.</span>}
                        </div>
                    </div>
                </Col>
                <Col md="6">
                    <div className="form-group">
                        <label className="form-label" htmlFor="phone">Nomor HP</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                id="phone"
                                className="form-control"
                                placeholder="Ex. 6282229366509"
                                {...register('phone', { required: true })}
                                onChange={(e) => onInputChange(e)}
                            />
                            {errors.phone && <span className="invalid">Kolom tidak boleh kosong.</span>}
                        </div>
                    </div>
                </Col>
            </Row>
            <div className="actions clearfix">
                <ul>
                    <li>
                        <Button color="primary" type="submit">Lanjut</Button>
                    </li>
                </ul>
            </div>
        </form>
    );
};

export default FormPersonal;
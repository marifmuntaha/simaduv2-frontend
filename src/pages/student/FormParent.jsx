import React, {useEffect, useState} from "react";
import {Col, Row, RSelect} from "../../components";
import DatePicker from "react-datepicker";
import moment from "moment/moment";
import "moment/locale/id"
import {Button} from "reactstrap";

const FormParent = ({formData, setFormData, methods, ...props}) => {
    const [fatherBirthdate, setFatherBirthdate] = useState(new Date());
    const [motherBirthDate, setMotherBirthDate] = useState(new Date());
    const [guardBirthDate, setGuardBirthDate] = useState(new Date());
    const { register, handleSubmit, formState: { errors }, setValue } = methods;
    const statusParentOptions = [
        {value: 1, label: "Masih Hidup"},
        {value: 2, label: "Meninggal"},
        {value: 3, label: "Tidak Diketahui"},
    ]
    const statusGuardOptions = [
        {value: 1, label: "Sama dengan Ayah"},
        {value: 2, label: "Sama dengan Ibu"},
        {value: 3, label: "Lainnya"},
    ]
    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit = () => {
        if (formData.guardStatus === 1) {
            setFormData({...formData, guardName: formData.fatherName})
            setFormData({...formData, guardNIK: formData.fatherNIK})
            setFormData({...formData, guardBirthplace: formData.fatherBirthplace})
            setFormData({...formData, guardBirthdate: formData.fatherBirthdate})
            setFormData({...formData, guardEmail: formData.fatherEmail})
            setFormData({...formData, guardPhone: formData.fatherPhone})
        } else if (formData.guardStatus === 2) {
            setFormData({...formData, guardName: formData.motherName})
            setFormData({...formData, guardNIK: formData.motherNIK})
            setFormData({...formData, guardBirthplace: formData.motherBirthplace})
            setFormData({...formData, guardBirthdate: formData.motherBirthdate})
            setFormData({...formData, guardEmail: formData.motherEmail})
            setFormData({...formData, guardPhone: formData.motherPhone})
        }
        props.next()
    }

    useEffect(() => {
        if (formData.guardStatus === 1) {
            setValue('guardName', formData.fatherName)
            setValue('guardNIK', formData.fatherNIK)
            setValue('guardBirthplace', formData.fatherBirthplace)
            setGuardBirthDate(moment(formData.fatherBirthdate).toDate())
            setValue('guardEmail', formData.fatherEmail)
            setValue('guardPhone', formData.fatherPhone)
        } else if (formData.guardStatus === 2) {
            setValue('guardName', formData.motherName)
            setValue('guardNIK', formData.motherNIK)
            setValue('guardBirthplace', formData.motherBirthplace)
            setGuardBirthDate(moment(formData.motherBirthdate).toDate())
            setValue('guardEmail', formData.motherEmail)
            setValue('guardPhone', formData.motherPhone)
        }
    }, [setValue, formData]);
    return (
        <React.Fragment>
            <form className="content clearfix" onSubmit={handleSubmit(onSubmit)}>
                <Row className="gy-4">
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="fatherStatus">Status Ayah</label>
                            <div className="form-control-wrap">
                                <RSelect
                                    id="fatherStatus"
                                    options={statusParentOptions}
                                    value={statusParentOptions?.find((e) => e.value === formData.fatherStatus)}
                                    onChange={(val) => {
                                        setFormData({...formData, fatherStatus: val.value})
                                    }}
                                    placeholder="Pilih Status Ayah"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="motherStatus">Status Ibu</label>
                            <div className="form-control-wrap">
                                <RSelect
                                    id="motherStatus"
                                    options={statusParentOptions}
                                    value={statusParentOptions?.find((e) => e.value === formData.motherStatus)}
                                    onChange={(val) => {
                                        setFormData({...formData, motherStatus: val.value})
                                    }}
                                    placeholder="Pilih Status Ibu"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="fatherName">Nama Ayah</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="fatherName"
                                    className="form-control"
                                    placeholder="Ex. Muhammad Arif Muntaha"
                                    {...register('fatherName', { required: true })}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.fatherName && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="motherName">Nama Ibu</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="motherName"
                                    className="form-control"
                                    placeholder="Ex. Eka Maftukhatul Khoeryah"
                                    {...register('motherName', { required: true })}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.motherName && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="fatherNIK">NIK Ayah</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="fatherNIK"
                                    className="form-control"
                                    placeholder="Ex. 3320011103940007"
                                    {...register('fatherNIK', { required: formData.fatherStatus === 1 })}
                                    disabled={formData.fatherStatus !== 1}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.fatherNIK && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="motherNIK">NIK Ibu</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="motherNIK"
                                    className="form-control"
                                    placeholder="Ex. 3320011103940007"
                                    {...register('motherNIK', { required: formData.motherStatus === 1 })}
                                    disabled={formData.motherStatus !== 1}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.motherNIK && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="fatherBirthplace">Tempat Lahir Ayah</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="fatherBirthplace"
                                    className="form-control"
                                    placeholder="Ex. Jepara"
                                    {...register('fatherBirthplace', { required: formData.fatherStatus === 1 })}
                                    disabled={formData.fatherStatus !== 1}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.fatherBirthplace && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="fatherBirthdate">Tanggal Lahir Ayah</label>
                            <div className="form-control-wrap">
                                <DatePicker
                                    locale="id"
                                    selected={fatherBirthdate}
                                    onChange={(e) => {
                                        setFormData({...formData, fatherBirthdate: moment(e).format('YYYY-MM-DD')});
                                        setFatherBirthdate(e)
                                    }}
                                    disabled={formData.fatherStatus !== 1}
                                    dateFormat={"dd/MM/yyyy"}
                                    className="form-control date-picker" />{" "}
                                {errors.fatherBirthdate && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="motherBirthplace">Tempat Lahir Ibu</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="motherBirthplace"
                                    className="form-control"
                                    placeholder="Ex. Kebumen"
                                    {...register('motherBirthplace', { required: formData.motherStatus === 1 })}
                                    disabled={formData.motherStatus !== 1}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.motherBirthplace && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="motherBirthdate">Tanggal Lahir Ibu</label>
                            <div className="form-control-wrap">
                                <DatePicker
                                    locale="id"
                                    selected={motherBirthDate}
                                    onChange={(e) => {
                                        setFormData({...formData, motherBirthdate: moment(e).format('YYYY-MM-DD')});
                                        setMotherBirthDate(e)
                                    }}
                                    disabled={formData.motherStatus !== 1}
                                    dateFormat={"dd/MM/yyyy"}
                                    className="form-control date-picker" />{" "}
                                {errors.motherBirthdate && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="fatherEmail">Alamat Email Ayah</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="fatherEmail"
                                    className="form-control"
                                    placeholder="Ex. marifmuntaha@gmail.com"
                                    {...register('fatherEmail', { required: formData.fatherStatus === 1 })}
                                    disabled={formData.fatherStatus !== 1}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.fatherEmail && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="fatherPhone">Nomor HP Ayah</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="fatherPhone"
                                    className="form-control"
                                    placeholder="Ex. 6282229366500"
                                    {...register('fatherPhone', { required: formData.fatherStatus === 1 })}
                                    disabled={formData.fatherStatus !== 1}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.fatherPhone && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="motherEmail">Alamat Email Ibu</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="motherEmail"
                                    className="form-control"
                                    placeholder="Ex. marifmuntaha@gmail.com"
                                    {...register('motherEmail', { required: formData.motherStatus === 1 })}
                                    disabled={formData.motherStatus !== 1}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.motherEmail && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="motherPhone">Nomor HP Ibu</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="motherPhone"
                                    className="form-control"
                                    placeholder="Ex. 6282229366500"
                                    {...register('motherPhone', { required: formData.motherStatus === 1 })}
                                    disabled={formData.motherStatus !== 1}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.motherPhone && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="12">
                        <div className="form-group">
                            <label className="form-label" htmlFor="guardStatus">Status Wali</label>
                            <div className="form-control-wrap">
                                <RSelect
                                    id="guardStatus"
                                    options={statusGuardOptions}
                                    value={statusGuardOptions?.find((e) => e.value === formData.guardStatus)}
                                    onChange={(val) => {
                                        setFormData({...formData, guardStatus: val.value})
                                    }}
                                    placeholder="Pilih Status Wali"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="guardName">Nama Wali</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="guardName"
                                    className="form-control"
                                    placeholder="Ex. Muhammad Arif Muntaha"
                                    {...register('guardName', { required: true })}
                                    disabled={formData.guardStatus !== 3}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.guardName && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="form-group">
                            <label className="form-label" htmlFor="guardNIK">NIK Wali</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="guardNIK"
                                    className="form-control"
                                    placeholder="Ex. 3320011103940007"
                                    {...register('guardNIK', { required: true })}
                                    disabled={formData.guardStatus !== 3}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.guardNIK && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="guardBirthplace">Tempat Lahir Wali</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="guardBirthplace"
                                    className="form-control"
                                    placeholder="Ex. Jepara"
                                    {...register('guardBirthplace', { required: true })}
                                    onChange={(e) => onInputChange(e)}
                                    disabled={formData.guardStatus !== 3}
                                />
                                {errors.guardBirthplace && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="guardBirthDate">Tanggal Lahir Wali</label>
                            <div className="form-control-wrap">
                                <DatePicker
                                    locale="id"
                                    selected={guardBirthDate}
                                    onChange={(e) => {
                                        setFormData({...formData, guardBirthDate: moment(e).format('YYYY-MM-DD')});
                                        setGuardBirthDate(e)
                                    }}
                                    disabled={formData.guardStatus !== 3}
                                    dateFormat={"dd/MM/yyyy"}
                                    className="form-control date-picker" />{" "}
                                {errors.guardBirthDate && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="guardEmail">Alamat Email Wali</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="guardEmail"
                                    className="form-control"
                                    placeholder="Ex. marifmuntaha@gmail.com"
                                    {...register('guardEmail', { required: true })}
                                    disabled={formData.guardStatus !== 3}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.guardEmail && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                    <Col md="3">
                        <div className="form-group">
                            <label className="form-label" htmlFor="guardPhone">Nomor HP Wali</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    id="guardPhone"
                                    className="form-control"
                                    placeholder="Ex. 6282229366500"
                                    {...register('guardPhone', { required: true })}
                                    disabled={formData.guardStatus !== 3}
                                    onChange={(e) => onInputChange(e)}
                                />
                                {errors.guardPhone && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="actions clearfix">
                    <ul>
                        <li><Button color="primary" type="submit">Lanjut</Button></li>
                        <li><Button color="primary" type="button" onClick={props.prev}>Kembali</Button></li>
                    </ul>
                </div>
            </form>
        </React.Fragment>
    )
}

export default FormParent;
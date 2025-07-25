import React, {useEffect, useState} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import id from "date-fns/locale/id"
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon, Row, RSelect} from "../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeTeacher, update as updateTeacher} from "../../utils/api/teacher"
import {store as storeUser, destroy as destroyUser} from "../../utils/api/user"
import {get as getInstitution} from "../../utils/api/institution"
import moment from "moment";

registerLocale("id", id)

const Partial = ({modal, setModal, teacher, setTeacher, setRefreshData}) => {
    const [loading, setLoading] = useState(false);
    const [birthdateSelected, setBirthdateSelected] = useState(new Date());
    const [institutionOptions, setInstitutionOptions] = useState([]);
    const genderOptions = [
        {value: 'L', label: 'Laki-laki'},
        {value: 'P', label: 'Perempuan'},
    ]
    const {reset, handleSubmit, control, watch, register, formState: {errors}, getValues, setValue} = useForm();
    const onSubmit = () => {
        teacher === null ? onStore(getValues()) : onUpdate(getValues());
    }
    const onStore = (params) => {
        setLoading(true);
        storeUser({
            name: params.name,
            email: params.email,
            username: params.pegId,
            password: params.birthplace,
            phone: params.phone,
            role: '4'
        }).then((resp) => {
            storeTeacher({
                userId: resp.id,
                institution: params.institution,
                name: params.name,
                pegId: params.pegId,
                birthplace: params.birthplace,
                birthdate: moment(params.birthdate).format('YYYY-MM-DD'),
                gender: params.gender,
                frontTitle: params.frontTitle,
                backTitle: params.backTitle,
                phone: params.phone,
                email: params.email,
                address: params.address,
            }).then(() => {
                setLoading(false);
                setRefreshData(true);
                toggle();
            }).catch(() => {
                destroyUser(resp.id).then(() => {
                    setLoading(false);
                }).catch(() => {
                    setLoading(false)
                })
            })
        }).catch(() => {
            setLoading(false)
        });
    }
    const onUpdate = (params) => {
        setLoading(true)
        updateTeacher(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setTeacher(null);
        setBirthdateSelected(new Date());
        reset();
    };

    useEffect(() => {
        getInstitution({type: "select", ladder: 'alias'}).then((resp) => setInstitutionOptions(resp));
    }, []);

    useEffect(() => {
        setValue('id', teacher?.id)
        setValue('userId', teacher?.userId)
        setValue('name', teacher?.name)
        setValue('pegId', teacher?.pegId)
        setValue('birthplace', teacher?.birthplace)
        setValue('birthdate', teacher?.birthdate)
        setValue('gender', teacher?.gender)
        setValue('frontTitle', teacher?.frontTitle)
        setValue('backTitle', teacher?.backTitle)
        setValue('phone', teacher?.phone)
        setValue('email', teacher?.email)
        setValue('address', teacher?.address)
    }, [teacher, setValue])

    return (
        <Modal isOpen={modal} toggle={toggle} size="md">
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {teacher ? 'UBAH' : 'TAMBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="institution">Pilih Lembaga</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                className="form-control"
                                name="institution"
                                render={({field: {onChange, value, ref}}) => (
                                    <RSelect
                                        isMulti
                                        inputRef={ref}
                                        options={institutionOptions}
                                        value={institutionOptions?.find((c) => c.value === value)}
                                        onChange={(val) => onChange(val.map((e) => e.value))}
                                        placeholder="Pilih Lembaga"
                                    />
                                )}/>
                            <input type="hidden" id="institution" className="form-control"/>
                            {errors.institution && <span className="invalid">Kolom tidak boleh kosong.</span>}
                        </div>
                    </div>
                    <Row className="gy-0">
                        <div className="form-group col-md-3">
                            <label className="form-label" htmlFor="frontTitle">Gelar Depan</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="frontTitle"
                                    placeholder="Ex. Drs,"
                                    {...register("frontTitle", {required: false})}
                                />
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="name">Nama Lengkap</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Ex. Muhammad Arif Muntaha"
                                    {...register("name", {required: true})}
                                />
                                {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-3">
                            <label className="form-label" htmlFor="backTitle">Gelar Belakang</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="backTitle"
                                    placeholder="Ex. S.Pd."
                                    {...register("backTitle", {required: true})}
                                />
                                {errors.backTitle && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Row>
                    <Row className="gy-0">
                        <div className="form-group col-md-4">
                            <label className="form-label" htmlFor="pegId">PegID</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="pegId"
                                    placeholder="Ex. 1235647876"
                                    {...register("pegId", {required: true})}
                                />
                                {errors.pegId && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label" htmlFor="birthplace">Tempat Lahir</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="birthplace"
                                    placeholder="Ex. Jepara"
                                    {...register("birthplace", {required: true})}
                                />
                                {errors.birthplace && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label" htmlFor="birthdate">Tanggal Lahir</label>
                            <div className="form-control-wrap">
                                <DatePicker
                                    locale="id"
                                    selected={birthdateSelected}
                                    onChange={(e) => {
                                        setValue('birthdate', e);
                                        setBirthdateSelected(e)
                                    }}
                                    dateFormat={"dd/MM/yyyy"}
                                    className="form-control date-picker" />{" "}
                                {errors.birthdate && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Row>
                    <Row className="gy-0">
                        <div className="form-group col-md-4">
                            <label className="form-label" htmlFor="gender">Jenis Kelamin</label>
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    className="form-control"
                                    name="gender"
                                    render={({field: {onChange, value, ref}}) => (
                                        <RSelect
                                            inputRef={ref}
                                            options={genderOptions}
                                            value={genderOptions?.find((c) => c.value === value)}
                                            onChange={(val) => onChange(val.value)}
                                            placeholder="Pilih Jenis Kelamin"
                                        />
                                    )}/>
                                <input type="hidden" id="gender" className="form-control"/>
                                {errors.gender && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label" htmlFor="phone">Nomor HP</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Ex. 082229366500"
                                    {...register("phone", {required: true})}
                                />
                                {errors.phone && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label" htmlFor="email">Alamat Email</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="Ex. info@darul-hikmah.sch.id"
                                    {...register("email", {required: true})}
                                />
                                {errors.email && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Row>
                    <div className="form-group">
                        <label className="form-label" htmlFor="address">Alamat</label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="address"
                                placeholder="Ex. Jl. Raya Jepara - Bugel KM 07 Menganti Kedung Jepara"
                                {...register("address", {required: false})}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Button color="primary" type="submit" size="md">
                            {loading ? <Spinner size="sm"/> : 'SIMPAN'}
                        </Button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default Partial;
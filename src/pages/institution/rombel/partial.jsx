import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon, Row, RSelect} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeRombel, update as updateRombel} from "../../../utils/api/institution/rombel"
import {get as getYear} from "../../../utils/api/master/year"
import {get as getInstitution} from "../../../utils/api/institution"
import {get as getLevel} from "../../../utils/api/master/level"
import {get as getMajor} from "../../../utils/api/master/major"
import {get as getTeacher} from "../../../utils/api/teacher"
import ladder from "../../master/ladder/index.jsx";

const Partial = ({modal, setModal, rombel, setRombel, setRefreshData}) => {
    const [loading, setLoading] = useState(false);
    const [yearOptions, setYearOptions] = useState([]);
    const [institutionOptions, setInstitutionOptions] = useState([]);
    const [ladder, setLadder] = useState(0);
    const [levelOptions, setLevelOptions] = useState([]);
    const [majorOptions, setMajorOptions] = useState([]);
    const [teacherOptions, setTeacherOptions] = useState([]);
    const {
        reset,
        handleSubmit,
        watch,
        control,
        register,
        formState: {errors},
        getValues,
        setValue
    } = useForm();
    const onSubmit = () => {
        rombel === null ? onStore(getValues()) : onUpdate(getValues());
    }
    const onStore = (params) => {
        setLoading(true);
        storeRombel(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const onUpdate = (params) => {
        setLoading(true)
        updateRombel(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setRombel(null);
        reset();
    };

    useEffect(() => {
        getYear({type: 'select'}).then((resp) => setYearOptions(resp));
        getInstitution({type: 'select', ladder: 'alias'}).then((resp) => setInstitutionOptions(resp));
    }, [])

    useEffect(() => {
        getLevel({type: 'select', ladderId: ladder}).then((resp) => setLevelOptions(resp));
        getMajor({type: 'select', ladderId: ladder}).then((resp) => setMajorOptions(resp));
    }, [ladder])

    useEffect(() => {
        getTeacher({type: 'select', institutionId: getValues('institutionId')}).then((resp) => setTeacherOptions(resp));
    }, [watch('institutionId')])

    useEffect(() => {
        setValue('id', rombel?.id)
        setValue('yearId', rombel?.year?.id)
        setValue('institutionId', rombel?.institution?.id)
        setValue('level', rombel?.level?.id)
        setValue('major', rombel?.major?.id)
        setValue('name', rombel?.name)
        setValue('alias', rombel?.alias)
        setValue('teacher', rombel?.teacher?.id)
    }, [rombel, setValue])

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {rombel ? 'UBAH' : 'TAMBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <Row className="gy-0">
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="yearId">Tahun Pelajaran</label>
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    className="form-control"
                                    name="yearId"
                                    render={({field: {onChange, value, ref}}) => (
                                        <RSelect
                                            inputRef={ref}
                                            options={yearOptions}
                                            value={yearOptions?.find((c) => c.value === value)}
                                            onChange={(val) => onChange(val.value)}
                                            placeholder="Pilih Tahun Pelajaran"
                                        />
                                    )}/>
                                <input type="hidden" id="yearId" className="form-control"/>
                                {errors.yearId && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="institutionId">Lembaga</label>
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    className="form-control"
                                    name="institutionId"
                                    render={({field: {onChange, value, ref}}) => (
                                        <RSelect
                                            inputRef={ref}
                                            options={institutionOptions}
                                            value={institutionOptions?.find((c) => c.value === value)}
                                            onChange={(val) => {
                                                onChange(val.value)
                                                setLadder(val.ladderId)
                                            }}
                                            placeholder="Pilih Lembaga"
                                        />
                                    )}/>
                                <input type="hidden" id="institutionId" className="form-control"/>
                                {errors.institutionId && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                    </Row>
                    <Row className="gy-0">
                        <div className="form-group col-md-4">
                            <label className="form-label" htmlFor="levelId">Tingkat</label>
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    className="form-control"
                                    name="levelId"
                                    render={({field: {onChange, value, ref}}) => (
                                        <RSelect
                                            inputRef={ref}
                                            options={levelOptions}
                                            value={levelOptions?.find((c) => c.value === value)}
                                            onChange={(val) => onChange(val.value)}
                                            placeholder="Pilih Tingkat"
                                        />
                                    )}/>
                                <input type="hidden" id="levelId" className="form-control"/>
                                {errors.levelId && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label" htmlFor="majorId">Jurusan</label>
                            <div className="form-control-wrap">
                                <Controller
                                    control={control}
                                    className="form-control"
                                    name="majorId"
                                    render={({field: {onChange, value, ref}}) => (
                                        <RSelect
                                            inputRef={ref}
                                            options={majorOptions}
                                            value={majorOptions?.find((c) => c.value === value)}
                                            onChange={(val) => onChange(val.value)}
                                            placeholder="Pilih Jurusan"
                                        />
                                    )}/>
                                <input type="hidden" id="majorId" className="form-control"/>
                                {errors.majorId && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-4">
                            <label className="form-label" htmlFor="name">Nama</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Ex. A, 1, B, 2"
                                    {...register("name", {required: true})}
                                />
                                {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                    </Row>
                    <div className="form-group">
                        <label className="form-label" htmlFor="alias">Alias</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="alias"
                                placeholder="Ex. XII.IPA.2"
                                {...register("alias", {required: true})}
                            />
                            {errors.alias && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="teacherId">Walikelas</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                className="form-control"
                                name="teacherId"
                                render={({field: {onChange, value, ref}}) => (
                                    <RSelect
                                        inputRef={ref}
                                        options={teacherOptions}
                                        value={teacherOptions?.find((c) => c.value === value)}
                                        onChange={(val) => onChange(val.value)}
                                        placeholder="Pilih Walikelas"
                                    />
                                )}/>
                            <input type="hidden" id="teacherId" className="form-control"/>
                            {errors.teacherId && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
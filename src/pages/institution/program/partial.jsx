import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon, Row, RSelect} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeProgram, update as updateProgram} from "../../../utils/api/institution/program"
import {get as getYear} from "../../../utils/api/master/year"
import {get as getInstitution} from "../../../utils/api/institution"

const Partial = ({modal, setModal, program, setProgram, setRefreshData}) => {
    const [loading, setLoading] = useState(false);
    const [yearOptions, setYearOptions] = useState([]);
    const [institutionOptions, setInstitutionOptions] = useState([])
    const {reset, handleSubmit, control, register, formState: {errors}, getValues, setValue} = useForm();
    const onSubmit = () => {
        program === null ? onStore(getValues()) : onUpdate(getValues());
    }
    const onStore = (params) => {
        setLoading(true);
        storeProgram(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const onUpdate = (params) => {
        setLoading(true)
        updateProgram(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setProgram(null);
        reset();
    };

    useEffect(() => {
        getYear({type: 'select'}).then((resp) => setYearOptions(resp));
        getInstitution({type: 'select', ladder: 'alias'}).then((resp) => setInstitutionOptions(resp));
    }, [])

    useEffect(() => {
        setValue('id', program?.id)
        setValue('yearId', program?.year?.id)
        setValue('institutionId', program?.institution?.id)
        setValue('name', program?.name)
        setValue('alias', program?.alias)
    }, [program, setValue])

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {program ? 'UBAH' : 'TAMBAH'}
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
                            <label className="form-label" htmlFor="institutionId">Pilih Lembaga</label>
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
                                            onChange={(val) => onChange(val.value)}
                                            placeholder="Pilih Lembaga"
                                        />
                                    )}/>
                                <input type="hidden" id="institutionId" className="form-control"/>
                                {errors.institutionId && <span className="invalid">Kolom tidak boleh kosong.</span>}
                            </div>
                        </div>
                    </Row>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nama Program</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. Tahfid"
                                {...register("name", {required: true})}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="alias">Alias</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="alias"
                                placeholder="Ex. TFZ"
                                {...register("alias", {required: true})}
                            />
                            {errors.alias && <span className="invalid">Kolom tidak boleh kosong</span>}
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
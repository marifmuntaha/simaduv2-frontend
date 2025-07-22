import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon, RSelect} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeYear, update as updateYear} from "../../../utils/api/master/year"

const Partial = ({modal, setModal, year, setYear, setRefreshData}) => {
    const [loading, setLoading] = useState(false);
    const activeOptions = [
        {value: 1, label: "Ya"},
        {value: 0, label: "Tidak"},
    ]
    const {reset, handleSubmit, control, register, formState: {errors}, getValues, setValue} = useForm();
    const onSubmit = () => {
        year === null ? onStore(getValues()) : onUpdate(getValues());
    }
    const onStore = (params) => {
        setLoading(true);
        storeYear(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const onUpdate = (params) => {
        setLoading(true)
        updateYear(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setYear(null);
        reset();
    };
    useEffect(() => {
        setValue('id', year?.id)
        setValue('name', year?.name)
        setValue('description', year?.description)
    }, [year, setValue])

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {year ? 'UBAH' : 'TAMBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nama Tahun</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. 2024/2025"
                                {...register("name", {required: true})}
                            />
                            {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="description">Diskripsi</label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="description"
                                placeholder="Ex. Tahun Pelajaran 2024/2025"
                                {...register("description", {required: false})}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="active">Pilih Aktif</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                className="form-control"
                                name="active"
                                render={({field: {onChange, value, ref}}) => (
                                    <RSelect
                                        inputRef={ref}
                                        options={activeOptions}
                                        value={activeOptions?.find((c) => c.value === value)}
                                        onChange={(val) => onChange(val.value)}
                                        placeholder="Pilih Aktif"
                                    />
                                )}/>
                            <input type="hidden" id="active" className="form-control"/>
                            {errors.active && <span className="invalid">Kolom tidak boleh kosong.</span>}
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
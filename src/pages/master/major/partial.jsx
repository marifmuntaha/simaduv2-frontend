import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon, RSelect} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeMajor, update as updateMajor} from "../../../utils/api/master/major"
import {get as getLadder} from "../../../utils/api/master/ladder"

const Partial = ({modal, setModal, major, setMajor, setRefreshData}) => {
    const [loading, setLoading] = useState(false);
    const [ladderOptions, setLadderOptions] = useState([]);
    const {reset, handleSubmit, control, register, formState: {errors}, getValues, setValue} = useForm();
    const onSubmit = () => {
        major === null ? onStore(getValues()) : onUpdate(getValues());
    }
    const onStore = (params) => {
        setLoading(true);
        storeMajor(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const onUpdate = (params) => {
        setLoading(true)
        updateMajor(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setMajor(null);
        reset();
    };
    useEffect(() => {
        setValue('id', major?.id)
        setValue('ladderId', major?.ladder?.id)
        setValue('name', major?.name)
        setValue('alias', major?.alias)
        setValue('description', major?.description)
    }, [major, setValue])
    useEffect(() => {
        getLadder({type: 'select'}).then(data => {
            setLadderOptions(data)
        })
    }, [])

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {major ? 'UBAH' : 'TAMBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="ladderId">Pilih Jenjang</label>
                        <div className="form-control-wrap">
                            <Controller
                                control={control}
                                className="form-control"
                                name="ladderId"
                                render={({field: {onChange, value, ref}}) => (
                                    <RSelect
                                        inputRef={ref}
                                        options={ladderOptions}
                                        value={ladderOptions?.find((c) => c.value === value)}
                                        onChange={(val) => onChange(val.value)}
                                        placeholder="Pilih Jenjang"
                                    />
                                )}/>
                            <input type="hidden" id="ladderId" className="form-control"/>
                            {errors.ladderId && <span className="invalid">Kolom tidak boleh kosong.</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nama Jurusan</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. Ilmu Pengetahuan Alam"
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
                                placeholder="Ex. IPA"
                                {...register("alias", {required: true})}
                            />
                            {errors.alias && <span className="invalid">Kolom tidak boleh kosong</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="description">Diskripsi</label>
                        <div className="form-control-wrap">
                            <textarea
                                className="form-control"
                                id="description"
                                placeholder="Ex. Jurusan Ilmu Pengetahuan Alam"
                                {...register("description", {required: false})}
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
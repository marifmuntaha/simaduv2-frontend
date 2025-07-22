import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon, RSelect} from "../../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeLevel, update as updateLevel} from "../../../utils/api/master/level"
import {get as getLadder} from "../../../utils/api/master/ladder"

const Partial = ({modal, setModal, level, setLevel, setRefreshData}) => {
    const [loading, setLoading] = useState(false);
    const [ladderOptions, setLadderOptions] = useState([]);
    const {reset, handleSubmit, control, register, formState: {errors}, getValues, setValue} = useForm();
    const onSubmit = () => {
        level === null ? onStore(getValues()) : onUpdate(getValues());
    }
    const onStore = (params) => {
        setLoading(true);
        storeLevel(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const onUpdate = (params) => {
        setLoading(true)
        updateLevel(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setLevel(null);
        reset();
    };
    useEffect(() => {
        setValue('id', level?.id)
        setValue('ladderId', level?.ladder?.id)
        setValue('name', level?.name)
        setValue('alias', level?.alias)
        setValue('description', level?.description)
    }, [level, setValue])
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
                {level ? 'UBAH' : 'TAMBAH'}
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
                        <label className="form-label" htmlFor="name">Nama Tingkat</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. 1"
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
                                placeholder="Ex. I"
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
                                placeholder="Ex. Tingkat 1"
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
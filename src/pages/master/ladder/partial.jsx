import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Icon} from "../../../components";
import {useForm} from "react-hook-form";
import {store as storeLadder, update as updateLadder} from "../../../utils/api/master/ladder"

const Partial = ({modal, setModal, ladder, setLadder, setRefreshData}) => {
    const [loading, setLoading] = useState(false);
    const {reset, handleSubmit, register, formState: {errors}, getValues, setValue} = useForm();
    const onSubmit = () => {
        ladder === null ? onStore(getValues()) : onUpdate(getValues());
    }
    const onStore = (params) => {
        setLoading(true);
        storeLadder(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const onUpdate = (params) => {
        setLoading(true)
        updateLadder(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setLadder(null);
        reset();
    };
    useEffect(() => {
        setValue('id', ladder?.id)
        setValue('name', ladder?.name)
        setValue('alias', ladder?.alias)
        setValue('description', ladder?.description)
    }, [ladder, setValue])

    return (
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {ladder ? 'UBAH' : 'TAMBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="name">Nama Jenjang</label>
                        <div className="form-control-wrap">
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Ex. Madrasah Aliyah"
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
                                placeholder="Ex. Madrasah Aliyah"
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
                                placeholder="Ex. Madrasah Aliyah"
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
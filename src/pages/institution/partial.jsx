import React, {useEffect, useState} from "react";
import {Button, Input, Modal, ModalBody, ModalHeader, Spinner} from "reactstrap";
import {Col, Icon, Row, RSelect} from "../../components";
import {Controller, useForm} from "react-hook-form";
import {store as storeInstitution, update as updateInstitution} from "../../utils/api/institution"
import {get as getLadder} from "../../utils/api/master/ladder"

const Partial = ({modal, setModal, institution, setInstitution, setRefreshData}) => {
    const [loading, setLoading] = useState(false);
    const [ladderOptions, setLadderOptions] = useState([]);
    const {reset, handleSubmit, control, register, formState: {errors}, getValues, setValue} = useForm();
    const onSubmit = () => {
        institution === null ? onStore(getValues()) : onUpdate(getValues());
    }
    const onStore = (params) => {
        setLoading(true);
        storeInstitution(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const onUpdate = (params) => {
        setLoading(true)
        updateInstitution(params).then(() => {
            setLoading(false)
            setRefreshData(true)
            toggle()
        }).catch(() => setLoading(false));
    }
    const toggle = () => {
        setModal(false);
        setInstitution(null);
        reset();
    };

    useEffect(() => {
        setValue('id', institution?.id)
        setValue('ladderId', institution?.ladder?.id)
        setValue('name', institution?.name)
        setValue('alias', institution?.alias)
        setValue('nsm', institution?.nsm)
        setValue('npsn', institution?.npsn)
        setValue('address', institution?.address)
        setValue('phone', institution?.phone)
        setValue('email', institution?.email)
        setValue('website', institution?.website)
        setValue('logo', institution?.logo)
    }, [institution, setValue])

    useEffect(() => {
        getLadder({type: 'select'}).then((data) => setLadderOptions(data))
    }, [])

    return (
        <Modal isOpen={modal} toggle={toggle} size={"md"}>
            <ModalHeader toggle={toggle} close={
                <button className="close" onClick={toggle}>
                    <Icon name="cross"/>
                </button>
            }>
                {institution ? 'UBAH' : 'TAMBAH'}
            </ModalHeader>
            <ModalBody>
                <form className="is-alter" onSubmit={handleSubmit(onSubmit)}>
                    <Row className="gy-0">
                        <div className="form-group col-md-12">
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
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="name">Nama Lembaga</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Ex. Darul Hikmah Menganti"
                                    {...register("name", {required: true})}
                                />
                                {errors.name && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="alias">Singkatan</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="alias"
                                    placeholder="Ex. MTSDH"
                                    {...register("alias", {required: true})}
                                />
                                {errors.alias && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="nsm">Nomor Statistik Madrasah</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nsm"
                                    placeholder="Ex. 1234567890"
                                    {...register("nsm", {required: true})}
                                />
                                {errors.nsm && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="npsn">Nomor Pokok Sekolah Nasional</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="npsn"
                                    placeholder="Ex. MTSDH"
                                    {...register("npsn", {required: true})}
                                />
                                {errors.npsn && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-12">
                            <label className="form-label" htmlFor="address">Alamat</label>
                            <div className="form-control-wrap">
                                    <textarea
                                        className="form-control"
                                        id="address"
                                        placeholder="Ex. Jl. Raya Jepara - Bugel KM 7 Menganti Kedung Jepara"
                                        {...register("address", {required: false})}
                                    />
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="phone">Nomor Telepon</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Ex. 0291-2276756"
                                    {...register("phone", {required: true})}
                                />
                                {errors.phone && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="email">Email</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    placeholder="Ex. info@mts.darul-hikmah.sch.id"
                                    {...register("email", {required: true})}
                                />
                                {errors.email && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="website">Website</label>
                            <div className="form-control-wrap">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="website"
                                    placeholder="Ex. https://mts.darul-hikmah.sch.id"
                                    {...register("website", {required: true})}
                                />
                                {errors.website && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="form-label" htmlFor="logo">Logo</label>
                            <div className="form-control-wrap">
                                <div className="form-file">
                                    <Input
                                        type="file"
                                        id="customFile"
                                        onChange={(e) => setValue('logo', e.target.files[0]) }
                                    />
                                </div>
                                {errors.logo && <span className="invalid">Kolom tidak boleh kosong</span>}
                            </div>
                        </div>
                        <div className="form-group">
                            <Button color="primary" type="submit" size="md">
                                {loading ? <Spinner size="sm"/> : 'SIMPAN'}
                            </Button>
                        </div>
                    </Row>
                </form>
            </ModalBody>
        </Modal>
    )
}

export default Partial;
import React from "react";
import ErrorImage from "../../images/gfx/error-404.svg";
import { Link } from "react-router-dom";
import { Block, BlockContent, Button } from "../../components";

const Error404 = () => {
    return (
        <>
            <Block className="nk-block-middle wide-md mx-auto">
                <BlockContent className="nk-error-ld text-center">
                    <img className="nk-error-gfx" src={ErrorImage} alt="error" />
                    <div className="wide-xs mx-auto">
                        <h3 className="nk-error-title">Ups! Mengapa kamu di sini?</h3>
                        <p className="nk-error-text">
                            Kami mohon maaf sebesar-besarnya atas ketidaknyamanan ini. Sepertinya Anda mencoba mengakses halaman yang pernah ada
                            dihapus atau tidak pernah ada.
                        </p>
                        <Link to={`${import.meta.env.BASE_URL}`}>
                            <Button color="primary" size="lg" className="mt-2">
                                Kembali Ke Dashboard
                            </Button>
                        </Link>
                    </div>
                </BlockContent>
            </Block>
        </>
    );
};
export default Error404;

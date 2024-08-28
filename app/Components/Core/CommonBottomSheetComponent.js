import React, { forwardRef } from "react";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import COLORS from "../../constants/colors";

const CommonBottomSheetComponent = forwardRef((
    {
        snapPoints,
        enablePanDownToClose = true,
        customBackgroundStyle,
        handleCustomIndicatorStyle,
        CustomHandle,
        children,
    },
    ref
) => {
    return (
        <BottomSheet
            ref={ref}
            index={-1}
            snapPoints={snapPoints || ["57%"]}
            enablePanDownToClose={enablePanDownToClose}
            backgroundStyle={{ borderRadius: 40, ...customBackgroundStyle }}
            handleIndicatorStyle={{
                backgroundColor: COLORS.white,
                ...handleCustomIndicatorStyle,
            }}
            handleComponent={CustomHandle}
        >
            <BottomSheetView>{children}</BottomSheetView>
        </BottomSheet>
    );
});

export default CommonBottomSheetComponent;

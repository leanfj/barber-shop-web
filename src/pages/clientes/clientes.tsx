import React from "react";
import "./clientes.scss";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  ColumnFixing,
  ColumnChooser,
  SearchPanel,
  GroupPanel,
  Editing,
  Export,
  Scrolling,
  Form,
  Popup,
  type DataGridTypes,
} from "devextreme-react/data-grid";
import { Item } from "devextreme-react/form";
import CustomStore from "devextreme/data/custom_store";
import { get } from "../../api/clientes";

import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import { jsPDF } from "jspdf";

export default function Clientes(): JSX.Element {
  return (
    <React.Fragment>
      <h2 className={"content-block"}>Clientes</h2>
      <div className={"content-block"}>
        <div className={"dx-card responsive-paddings"}>
          <DataGrid
            className={"dx-card wide-card"}
            dataSource={customDataStore as any}
            showBorders={true}
            defaultFocusedRowIndex={0}
            columnAutoWidth={true}
            columnHidingEnabled={false}
            allowColumnReordering={true}
            onExporting={exportGrid}
            remoteOperations={true}
            height={600}
            columnResizingMode="nextColumn"
            allowColumnResizing={true}
          >
            <Paging defaultPageSize={10} />
            <Scrolling mode="virtual" rowRenderingMode="virtual" />
            <Pager
              showPageSizeSelector={true}
              showInfo={true}
              allowedPageSizes={allowedPageSizes}
              visible={true}
            />
            <FilterRow visible={true} />
            <SearchPanel visible={true} />
            <ColumnFixing enabled={true} />
            <ColumnChooser enabled={true} mode="select" />
            <GroupPanel visible={true} />
            <Editing
              mode="popup"
              allowUpdating={true}
              allowDeleting={true}
              allowAdding={true}
              confirmDelete={true}
            >
              <Popup
                title="Editar Cliente"
                visible={true}
                showTitle={true}
                width={700}
                height={525}
              />
              <Form>
                <Item itemType="group" colCount={2} colSpan={2}>
                  <Item dataField="nome" />
                  <Item dataField="cpf" />
                  <Item
                    dataField="email"
                    validationRules={[
                      {
                        type: "email",
                        message: "E-mail inválido",
                      },
                    ]}
                  />
                  <Item dataField="telefone" />
                  <Item dataField="genero" />
                  <Item dataField="dataNascimento" />
                </Item>
                <Item
                  itemType="group"
                  caption="Localização"
                  colCount={2}
                  colSpan={2}
                >
                  <Item dataField="endereco" />
                  <Item dataField="cidade" />
                  <Item dataField="estado" />
                  <Item dataField="cep" />
                </Item>
              </Form>
            </Editing>
            <Export enabled={true} formats={exportFormats} />

            <Column dataField={"id"} width={90} visible={false} />
            <Column
              dataField={"tenantId"}
              width={190}
              caption={"Tenant ID"}
              visible={false}
            />
            <Column dataField={"nome"} caption={"Nome"} fixed={true} />
            <Column dataField={"cpf"} caption={"CPF"} />
            <Column
              dataField={"email"}
              caption={"E-mail"}
              allowSorting={false}
            />
            <Column dataField={"telefone"} caption={"Telefone"} />
            <Column dataField={"endereco"} caption={"Endereço"} />
            <Column dataField={"cidade"} caption={"Cidade"} />
            <Column dataField={"estado"} caption={"Estado"} />
            <Column dataField={"genero"} caption={"CEP"} />
            <Column dataField={"cep"} caption={"Genero"} />
            <Column
              dataField={"dataNascimento"}
              caption={"Data de Nascimento"}
              dataType={"date"}
            />
            <Column
              dataField={"dataCadastro"}
              caption={"Data de Cadastro"}
              dataType={"date"}
              visible={false}
            />
            <Column
              dataField={"dataAtualizacao"}
              caption={"Data de Atualização"}
              dataType={"date"}
              visible={false}
            />
          </DataGrid>
        </div>
      </div>
    </React.Fragment>
  );
}

// const dataSource = {
//   store: {
//     version: 2,
//     type: "odata",
//     key: "Task_ID",
//     url: "https://js.devexpress.com/Demos/DevAV/odata/Tasks",
//   },
//   expand: "ResponsibleEmployee",
//   select: [
//     "Task_ID",
//     "Task_Subject",
//     "Task_Start_Date",
//     "Task_Due_Date",
//     "Task_Status",
//     "Task_Priority",
//     "Task_Completion",
//     "ResponsibleEmployee/Employee_Full_Name",
//   ],
// };

// const priorities = [
//   { name: "High", value: 4 },
//   { name: "Urgent", value: 3 },
//   { name: "Normal", value: 2 },
//   { name: "Low", value: 1 },
// ];

const customDataStore = new CustomStore({
  key: "id",
  load: async (loadOptions: any): Promise<any> => {
    let params = "?";

    [
      "filter",
      "group",
      "groupSummary",
      "parentIds",
      "requireGroupCount",
      "requireTotalCount",
      "searchExpr",
      "searchOperation",
      "searchValue",
      "select",
      "sort",
      "skip",
      "take",
      "totalSummary",
      "userData",
    ].forEach(function (i) {
      if (i in loadOptions && isNotEmpty(loadOptions[i])) {
        params += `${i}=${JSON.stringify(loadOptions[i])}&`;
      }
    });
    params = params.slice(0, -1);

    const clientes = await get(params);

    if (!clientes.isOk) {
      throw new Error(clientes.data as string);
    }
    return clientes;
  },
  errorHandler: (error: any): void => {
    console.log(error.message);
  },
});

const isNotEmpty = (value: any): boolean =>
  value !== undefined && value !== null && value !== "";

// function handleErrors(response: any): any {
//   if (!response.ok) {
//     throw Error((response.statusText as string) ?? "");
//   }
//   return response;
// }

const exportFormats = ["xlsx"];
const allowedPageSizes: Array<DataGridTypes.PagerPageSize | number> = [
  5,
  10,
  20,
  50,
  "all",
];

async function exportGrid(e: any): Promise<void> {
  if (e.format === "xlsx") {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");
    await exportDataGrid({
      worksheet,
      component: e.component,
    }).then(async function () {
      await workbook.xlsx.writeBuffer().then(function (buffer): void {
        saveAs(
          new Blob([buffer], { type: "application/octet-stream" }),
          `${new Date().getTime()}_Clientes.xlsx`,
        );
      });
    });
  } else if (e.format === "pdf") {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    await exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save(`${new Date().getTime()}_Clientes.pdf`);
    });
  }
}

package com.mizu20040814.kakeiboapi.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ExpenseRequest {

    @NotNull(message = "日付は必須です")
    private LocalDate date;

    @NotNull(message = "金額は必須です")
    @Min(value = 1, message = "金額は1円以上で入力してください")
    private Integer amount;

    @NotBlank(message = "カテゴリは必須です")
    @Size(max = 50, message = "カテゴリは50文字以内で入力してください")
    private String category;

    @Size(max = 200, message = "メモは200文字以内で入力してください")
    private String memo;
}